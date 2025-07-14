<?php

namespace App\Services;

use App\Models\Order;
use App\Models\SubscribableProduct;
use App\Models\User;
use Illuminate\Http\Request;
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

			$subscription = $user->subscriptions()->create([
				'subscribable_product_id' => $subscribableProductId,
				"start_date" => now(),
				"end_date" => now()->addMonths($months),
				"amount" => $subscribableProduct->price_per_month * $months,
				"transaction_id" => $request->get("payload")['payment']['entity']['id'],
				"months" => $months,
				"status" => 'active',
			]);
		}
		Log::info("Razorpay Subscription Callback Completed");
		return response()->json();
	}



	function processProductPayment($request)
	{
		$event = $request->get("event");
		if ($event == "payment.authorized") {

			$order_id = $request->get("payload")['payment']['entity']['order_id'];
			$payment_id = $request->get("payload")['payment']['entity']['id'];
			$order = Order::where("razorpay_order_id", $order_id)->first();
			$order->payment_status = "completed";
			$order->razorpay_payment_id = $payment_id;
			$order->save();

			$order->addEvent("payment", "Payment Success", "Received payment with pay id: " . $payment_id, "system");
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
