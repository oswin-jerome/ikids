<?php

namespace App\Services;

use App\Models\Order;
use App\Models\SubscribableProduct;
use App\Models\User;
use App\Notifications\DirectOrderPlaced;
use App\Notifications\PaymentReceivedNotification;
use App\Notifications\SubscriptionActivatedNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentProcessingService
{
	function  processSubscriptionPayments(Request $request)
	{
		Log::info("Razorpay Subscription Callback");
		Log::info($request);
		$event = $request->get("event");
		if ($event == "payment.authorized") {
			$notes = $request->get("payload")['payment']['entity']['notes'];
			if (!isset($notes['months']) || !isset($notes['subscribable_product_id']) || !isset($notes['user_id'])) {
				Log::error('Invalid subscription details: ' . json_encode($notes));
				return response()->json([
					'error' => 'No months provided in request.'
				]);
			}
			$months = $notes['months'];
			$user_id = $notes['user_id'];
			$user = User::findOrFail($user_id);

			$subscribableProductId = $notes['subscribable_product_id'];
			$subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);

			$activeSubscription = $user->subscriptions()
				->whereIn('status', ['active', 'pending'])
				->where("transaction_id", $request->get("payload")['payment']['entity']['id'])
				->exists();
			// Check if already payment processed though callback
			if ($activeSubscription) {
				Log::info("Subscription already in place for user: " . $user->id);
				return response()->json([
					'message' => "Subscription already in place."
				]);
			}
			$address = json_decode($notes['address'] ?? "", true) ?? [];
			$subscription = $user->subscriptions()->create([
				'subscribable_product_id' => $subscribableProductId,
				"start_date" => now(),
				"end_date" => now()->addMonths($months),
				"amount" => $subscribableProduct->price_per_month * $months,
				"transaction_id" => $request->get("payload")['payment']['entity']['id'],
				"months" => $months,
				"status" => 'active',
				"payment_status" => 'completed',
				"first_name" => $address['first_name'] ?? "",
				"last_name" => $address['last_name'] ?? "",
				"address" => $address['address'] ?? "",
				"postal_code" => $address['postal_code'] ?? "",
				"city" => $address['city'] ?? "",
				"phone_number" => $address['phone_number'] ?? "",
			]);
			Log::info("SubscriptionActivatedNotification");
			$user->notify(new SubscriptionActivatedNotification($subscription));
		}
		Log::info("Razorpay Subscription Callback Completed");
		return response()->json();
	}



	function processProductPayment($request)
	{
		$event = $request->get("event");
		if ($event == "payment.authorized") {

			try {
				DB::beginTransaction();
				$order_id = $request->get("payload")['payment']['entity']['order_id'];
				$payment_id = $request->get("payload")['payment']['entity']['id'];
				$order = Order::where("razorpay_order_id", $order_id)->first();
				$order->payment_status = "completed";
				$order->razorpay_payment_id = $payment_id;
				$order->save();
				Log::info("Payment status updated payID: " . $payment_id . " Order ID: " . $order->order_id);

				// Update stock
				foreach ($order->orderItems as $orderItem) {
					/** @var App\Models\Product $product */
					$product = $orderItem->product;
					$product->current_stock = $product->current_stock - $orderItem->quantity;
					$product->save();
				}
				$order->addEvent("payment", "Payment Success", "Received payment with pay id: " . $payment_id, "system");
				DB::commit();
				// TODO: Maybe combine both into one mail
				$order->customer->notify(new DirectOrderPlaced($order));
				$order->customer->notify(new PaymentReceivedNotification($order));
			} catch (\Exception $e) {
				Log::error("Unable to process order | PaymentProcessingService::class");
				Log::error($e);
				Log::error($request);
				$order->addEvent("payment", "Failed Processing order", "Received payment with pay id: " . $payment_id . " but unable to process your order, please contact support", "system");
			}
		} else if ($event == "payment.failed") {
			$order_id = $request->get("payload")['payment']['entity']['order_id'];
			$payment_id = $request->get("payload")['payment']['entity']['id'];
			$order = Order::where("razorpay_order_id", $order_id)->first();
			$order->payment_status = "failed";
			$order->status = "cancelled";
			$order->razorpay_payment_id = $payment_id;
			$order->save();
			$order->addEvent("payment", "Payment Failed", "Failed to process payment pay id: " . $payment_id, "system");
			$order->addEvent("order", "Order Cancel", "Cancelling order due to payment failure", "system");
		}
	}
}
