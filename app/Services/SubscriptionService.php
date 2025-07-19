<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\SubscribableProduct;
use App\Models\User;
use App\Notifications\SubscriptionOrderPlacedNotification;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{

	function processMonthlySubscriptions()
	{
		Log::info("Started ");
		// TODO: mind price length

		$now = Carbon::now()->endOfMonth();

		$activeSubscriptions = \App\Models\Subscription::where("end_date", ">", $now)
			->where(function ($query) use ($now) {
				$query->whereNull('last_processed')
					->orWhereMonth('last_processed', '!=', $now->month)
					->orWhereYear('last_processed', '!=', $now->year);
			})
			->with("subscribableProduct")->get();
		foreach ($activeSubscriptions as $subscription) {
			Log::info("Processing subscription for user: {$subscription->user_id}, plan: {$subscription->id}");
			$subscribableProduct = $subscription->subscribableProduct;
			Log::info($subscribableProduct);
			$product = $subscribableProduct->product;
			Log::info($product);
			$order = Order::create([
				'user_id' => $subscription->user_id,
				"type" => "subscription",
				"status" => "pending",
				"payment_status" => "completed",
				"total_amount" => 0,
				"razorpay_payment_id" => $subscription->transaction_id,
				"first_name" => $subscription->customer->name,
				"last_name" => $subscription->customer->name,
				"phone_number" => "$subscription->phone",
				"address" => "$subscription->address",
				"city" => "$subscription->city",
				"postal_code" => "$subscription->postal_code",
			]);
			if ($product != null) {
				$order->orderItems()->create([
					"product_id" => $product->id,
					"quantity" => 1,
					"price" => $product->selling_price,
				]);
				$product->current_stock = $product->current_stock - 1;
				$product->save(); // saving immediately thinking what happens if this breaks at some point
			}
			$subscription->last_processed = Carbon::now();
			$subscription->save();
			$order->addEvent("order", "Order Placed", "Subscription scheduler placed an order", "system");
			$order->customer->notify(new SubscriptionOrderPlacedNotification($subscription, $order));
		}
	}

	function createSubscription(User $user, SubscribableProduct $subscribableProduct, $months, $address, $razorpayPaymentId)
	{
		$now = Carbon::now()->endOfMonth();
		$end = Carbon::now()->endOfMonth()->addMonths($months);
		$subscription = $user->subscriptions()->create([
			'subscribable_product_id' => $subscribableProduct->id,
			"start_date" => $now,
			"end_date" => $end,
			"amount" => $subscribableProduct->price_per_month * $months,
			"transaction_id" => $razorpayPaymentId,
			"months" => $months,
			"first_name" => $address['first_name'] ?? "",
			"last_name" => $address['last_name'] ?? "",
			"address" => $address['address'] ?? "",
			"postal_code" => $address['postal_code'] ?? "",
			"city" => $address['city'] ?? "",
			"phone_number" => $address['phone_number'] ?? "",
			"payment_status" => 'completed',
		]);

		return $subscription;
	}
}
