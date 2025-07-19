<?php

use App\Models\Order;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Log;

uses(RefreshDatabase::class);

it('processes monthly subscriptions and creates orders', function () {

	$user = User::factory()->create();

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



	$service = new SubscriptionService();
	$service->processMonthlySubscriptions();

	expect(Order::count())->toBe(1);

	$order = Order::first();
	expect($order->user_id)->toBe($user->id)
		->and($order->type)->toBe('subscription')
		->and($order->payment_status)->toBe('completed')
		->and($order->total_amount)->toBe(0); // needs discussion 

	$product->refresh();
	expect($product->current_stock)->toBe(9);
});
