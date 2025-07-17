<?php

namespace App\Services;

use App\Models\Order;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{

	function processMonthlySubscriptions()
	{
		// TODO: add product logic
		// TODO: Prevent duplicate orders 
		// TODO: Update subscription status
		// TODO: Update stock
		// TODO: Send email notification
		// TODO: get address from user before subscription

		$now = now();

		$activeSubscriptions = \App\Models\Subscription::where("end_date", ">=", $now)->get();
		foreach ($activeSubscriptions as $subscription) {
			Log::info("Processing subscription for user: {$subscription->user_id}, plan: {$subscription->id}");
			$order = Order::create([
				'user_id' => $subscription->user_id,
				"type" => "subscription",
				"status" => "pending",
				"payment_status" => "completed",
				"total_amount" => $subscription->amount,
				"razorpay_payment_id" => $subscription->transaction_id,
				"first_name" => $subscription->customer->name,
				"last_name" => $subscription->customer->name,
				"phone_number" => "$subscription->user->phone",
				"address" => "$subscription->user->address",
				"city" => "$subscription->user->city",
				"postal_code" => "$subscription->user->postal_code",
			]);
			$order->addEvent("order", "Order Placed", "Subscription scheduler placed an order", "system");

			// $order->products()->attach($subscription->plan->products->pluck('id')->toArray(), [
			// 	'quantity' => 1,
			// 	'price' => $subscription->plan->amount
			// ]);
			// $subscription->update(['last_billed_at' => $now]);
		}
	}
}
