<?php

namespace App\Services;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{

	function processMonthlySubscriptions()
	{
		Log::info("Started ");
		// TODO: add product logic
		// TODO: Prevent duplicate orders 
		// TODO: Update subscription status
		// TODO: Send email notification
		// TODO: mind price length

		$now = now();

		$activeSubscriptions = \App\Models\Subscription::where("end_date", ">=", $now)->with("subscribableProduct")->get();
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
			$order->addEvent("order", "Order Placed", "Subscription scheduler placed an order", "system");
		}
	}
}
