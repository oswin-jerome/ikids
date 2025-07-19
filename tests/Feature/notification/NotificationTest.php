<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use App\Models\User;
use App\Notifications\SubscriptionActivatedNotification;
use App\Notifications\SubscriptionOrderPlacedNotification;
use Illuminate\Support\Facades\Notification;

test("Subscription notification", function () {
	Notification::fake();

	$user = User::factory()->create();
	$user2 = User::factory()->create();

	$product = Product::factory()->create([
		'selling_price' => 100,
		"current_stock" => 10
	]);

	$subscribable = SubscribableProduct::factory()->create([
		"product_id" => $product->id
	]);

	$subscription = Subscription::factory()
		->create([
			"user_id" => $user->id,
			'start_date' => now(),
			'end_date' => now()->addMonth(),
			'amount' => 100,
			'months' => 12,
			'payment_status' => 'completed',
			'transaction_id' => 'tx_123',
			"first_name" => "Oswin",
			"last_name" => "Jerome",
			"phone_number" => "8344441492",
			"address" => "4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\nParvathipuram\nNAGERCOIL, TAMIL NADU 629003\nIndia",
			"city" => "Nagercoil",
			"postal_code" => "629003",
			"subscribable_product_id" => $subscribable->id
		]);

	$user->notify(new SubscriptionActivatedNotification($subscription));

	Notification::assertSentTo(
		$user,
		SubscriptionActivatedNotification::class
	);
});


test("Subscription order notification", function () {
	Notification::fake();

	$user = User::factory()->create();
	$user2 = User::factory()->create();

	$product = Product::factory()->create([
		'selling_price' => 100,
		"current_stock" => 10
	]);

	$subscribable = SubscribableProduct::factory()->create([
		"product_id" => $product->id
	]);

	$subscription = Subscription::factory()
		->create([
			"user_id" => $user->id,
			'start_date' => now(),
			'end_date' => now()->addMonth(),
			'amount' => 100,
			'months' => 12,
			'payment_status' => 'completed',
			'transaction_id' => 'tx_123',
			"first_name" => "Oswin",
			"last_name" => "Jerome",
			"phone_number" => "8344441492",
			"address" => "4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\nParvathipuram\nNAGERCOIL, TAMIL NADU 629003\nIndia",
			"city" => "Nagercoil",
			"postal_code" => "629003",
			"subscribable_product_id" => $subscribable->id
		]);

	$order = Order::factory()->create([
		"user_id" => $user->id,
		"type" => "subscription",
		"total_amount" => 10,
		"first_name" => "Oswin",
		"last_name" => "Jerome",
		"phone_number" => "8344441492",
		"city" => "Nagercoil",
		"postal_code" => "629003",
		"address" => "629003",
	]);

	$user->notify(new SubscriptionOrderPlacedNotification($subscription, $order));

	Notification::assertSentTo(
		$user,
		SubscriptionOrderPlacedNotification::class
	);
});
