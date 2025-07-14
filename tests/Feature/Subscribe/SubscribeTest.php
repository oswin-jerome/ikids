<?php

use App\Models\Cart;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use App\Models\User;
use App\Services\RazorpayService;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Log as FacadesLog;
use Razorpay\Api\Api;
use Razorpay\Api\Order;

use function PHPUnit\Framework\assertCount;


test('Able to place razorpay order', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$product = Product::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();

	$mock = Mockery::mock(RazorpayService::class);
	$mock->shouldReceive('createOrder')->andReturn((object)[
		'id' => 'order_123',
		"subscribable_product_id" => $subscribableProduct->id,
		"months" => 1,
	]);
	$this->app->instance(RazorpayService::class, $mock);

	$response = $this->actingAs($user)
		->post(route('user.subscriptions.create_order'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 1,
		]);
	$response->assertJson([
		'order_id' => 'order_123',
	]);
	$response->assertOk();
});

test('Restrict user from subscribing if there is a active subscription', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$product = Product::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();

	$mock = Mockery::mock(RazorpayService::class);
	$mock->shouldReceive('createOrder')->andReturn((object)[
		'id' => 'order_123',
		"subscribable_product_id" => $subscribableProduct->id,
		"months" => 1,
	]);
	$this->app->instance(RazorpayService::class, $mock);

	Subscription::factory()->create([
		'subscribable_product_id' => $subscribableProduct->id,
		'user_id' => $user->id,
		'status' => 'active',
	]);

	$response = $this->actingAs($user)
		->post(route('user.subscriptions.create_order'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 1,
		]);

	$response->assertJson([
		'message' => "You already have an active subscription."
	]);
	$response->assertStatus(422);
});

test('Users can view their subscriptions', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$subscribableProduct = SubscribableProduct::factory()->create();
	$subscription = Subscription::factory()->create([
		'subscribable_product_id' => $subscribableProduct->id,
		'user_id' => $user->id,
		'status' => 'active',
	]);
	$response = $this->actingAs($user)->get(route("user.subscriptions.index"))->assertOk();
	// Validate inertia
	$response->assertInertia(
		fn($page) => $page
			->component('user/Subscriptions')
			->has('subscriptions', 1)
	);
});

test('Razorpay webhook can process payments', function () {
	$user = User::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();

	$response = $this->post(route("api.razorpay.callback"), [
		"entity" => "event",
		"account_id" => "acc_ENflEsJMwta13P",
		"event" => "payment.authorized",
		"contains" => ["payment"],
		"payload" => [
			"payment" => [
				"entity" => [
					"id" => "pay_QsbtJcwY43a6fs",
					"entity" => "payment",
					"amount" => 42793,
					"currency" => "INR",
					"status" => "authorized",
					"order_id" => "order_QsbrvyqV5tHvmW",
					"invoice_id" => null,
					"international" => false,
					"method" => "upi",
					"amount_refunded" => 0,
					"refund_status" => null,
					"captured" => false,
					"description" => "i-Kids Subscription Payment",
					"card_id" => null,
					"bank" => null,
					"wallet" => null,
					"vpa" => "success@razorpay",
					"email" => "john.doe@example.com",
					"contact" => "+919999999999",
					"notes" => [
						"months" => 1,
						"user_id" => $user->id,
						"subscribable_product_id" => $subscribableProduct->id,
						"type" => "subscription"
					],
					"fee" => null,
					"tax" => null,
					"error_code" => null,
					"error_description" => null,
					"error_source" => null,
					"error_step" => null,
					"error_reason" => null,
					"acquirer_data" => [
						"rrn" => "870314994031",
						"upi_transaction_id" => "5B2FFE77BDBAA01D72CF49707F1631D5"
					],
					"created_at" => 1752422458,
					"upi" => [
						"vpa" => "success@razorpay"
					]
				]
			]
		],
		"created_at" => 1752422458
	]);
	FacadesLog::info($response->getContent());
	$response->assertOk();
	$response = $this->actingAs($user)->get(route("user.subscriptions.index"))->assertOk();

	$response->assertInertia(
		fn($page) => $page
			->component('user/Subscriptions')
			->has('subscriptions', 1)
	);
});
