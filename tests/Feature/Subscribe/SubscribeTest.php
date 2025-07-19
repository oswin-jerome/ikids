<?php

use App\Models\Cart;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use App\Models\User;
use App\Services\RazorpayService;
use App\Services\SubscriptionService;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Facade;
use Illuminate\Support\Facades\Log as FacadesLog;
use Razorpay\Api\Api;
use Razorpay\Api\Order;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNotNull;
use function PHPUnit\Framework\assertSame;
use function PHPUnit\Framework\assertTrue;

test('Able to place razorpay order', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$product = Product::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();

	$response = $this->actingAs($user)
		->post(route('user.subscriptions.create_order'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 1,
			"address" => "{\"first_name\":\"Oswin\",\"last_name\":\"Jerome\",\"phone_number\":\"8344441492\",\"address\":\"4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\\nParvathipuram\\nNAGERCOIL, TAMIL NADU 629003\\nIndia\",\"city\":\"Nagercoil\",\"postal_code\":\"629003\"}"
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
		"end_date" => Carbon::now()->addMonths(2)
	]);

	$response = $this->actingAs($user)
		->post(route('user.subscriptions.create_order'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 1,
			"address" => "{\"first_name\":\"Oswin\",\"last_name\":\"Jerome\",\"phone_number\":\"8344441492\",\"address\":\"4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\\nParvathipuram\\nNAGERCOIL, TAMIL NADU 629003\\nIndia\",\"city\":\"Nagercoil\",\"postal_code\":\"629003\"}"
		]);

	$response->assertJson([
		'message' => "You already have an active subscription."
	]);
	$response->assertStatus(200);
});

test('Users can view their subscriptions', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$subscribableProduct = SubscribableProduct::factory()->create();
	$subscription = Subscription::factory()->create([
		'subscribable_product_id' => $subscribableProduct->id,
		'user_id' => $user->id,
		"end_date" => Carbon::now()->addMonths(10)
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
						"months" => 12,
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


test('Razorpay webhook can process payments with address', function () {
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
						"months" => 3,
						"user_id" => $user->id,
						"subscribable_product_id" => $subscribableProduct->id,
						"type" => "subscription",
						"address" => json_encode([
							"first_name" => "Oswin",
							"last_name" => "Jerome",
							"phone_number" => "8344441492",
							"address" => "4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\nParvathipuram\nNAGERCOIL, TAMIL NADU 629003\nIndia",
							"city" => "Nagercoil",
							"postal_code" => "629003"
						])
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
	$user->refresh();
	$sub = $user->subscriptions->first();
	assertSame($sub->first_name, "Oswin");
	assertSame($sub->last_name, "Jerome");
	assertSame($sub->address, "4/101 A2/bc2, Jos Cottage, Raphael Street Elanthayadi\nParvathipuram\nNAGERCOIL, TAMIL NADU 629003\nIndia");
	assertSame($sub->postal_code, "629003");
	assertSame($sub->city, "Nagercoil");
	assertSame($sub->phone_number, "8344441492");
	$subscription = $user->subscriptions()->first();
	// assertEquals(3, $subscription->months_left);
});

test("Status is derived from end date", function () {
	$subscription =  Subscription::factory()->create();
	$subscription->end_date = Carbon::now()->addMonth();
	$subscription->save();
	$subscription->refresh();
	assertEquals("active", $subscription->status);
	$subscription->end_date = Carbon::now()->subMonth();
	$subscription->save();
	$subscription->refresh();
	assertEquals("expired", $subscription->status);
});

test("Months left is derived", function () {
	$subscription =  Subscription::factory()->create();
	$subscription->end_date = Carbon::now()->addMonth();
	$subscription->start_date = Carbon::now();
	$subscription->save();
	$subscription->refresh();
	assertEquals(1, $subscription->months_left);

	$subscription->end_date = Carbon::now()->addMonths(2)->subDays(10);
	$subscription->save();
	$subscription->refresh();
	assertEquals(2, $subscription->months_left);
});


test("Create subscription in subscription Service", function () {
	Carbon::setTestNow(Carbon::parse('2025-07-19'));
	$user = User::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();
	$service = new SubscriptionService();
	$subscription = $service->createSubscription($user, $subscribableProduct, 12, [], "123");
	assertNotNull($subscription);
	$now = Carbon::now()->endOfMonth();
	$this->assertEquals('2025-07-31 23:59:59', $now->toDateTimeString());
	$this->assertEquals('2025-07-31 23:59:59', $subscription->start_date->toDateTimeString());
	$this->assertEquals('2026-07-31 23:59:59', $subscription->end_date->toDateTimeString());

	Carbon::setTestNow(Carbon::parse('2025-02-25'));
	$subscription = $service->createSubscription($user, $subscribableProduct, 12, [], "123");
	$now = Carbon::now()->endOfMonth();
	$this->assertEquals('2025-02-28 23:59:59', $now->toDateTimeString());
	$this->assertEquals('2025-02-28 23:59:59', $subscription->start_date->toDateTimeString());
	$this->assertEquals('2026-02-28 23:59:59', $subscription->end_date->toDateTimeString());


	// Test Leap year
	Carbon::setTestNow(Carbon::parse('2028-02-25'));
	$subscription = $service->createSubscription($user, $subscribableProduct, 12, [], "123");
	$now = Carbon::now()->endOfMonth();
	$this->assertEquals('2028-02-29 23:59:59', $subscription->start_date->toDateTimeString());
	$this->assertEquals('2029-03-01 23:59:59', $subscription->end_date->toDateTimeString());

	Carbon::setTestNow();
});
