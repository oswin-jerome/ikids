<?php

use App\Models\Cart;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use App\Models\User;

use function PHPUnit\Framework\assertCount;

test('Able to subscribe', function () {
	$user = User::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();

	expect($user->subscriptions)->toHaveCount(0);
	$response = $this->actingAs($user)
		->post(route('user.subscriptions.store'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 3,
		]);
	$response->assertRedirect();
	$user->refresh();

	expect($user->subscriptions)->toHaveCount(1);
	expect($user->subscriptions->first()->subscribable_product_id)->toBe($subscribableProduct->id);
});

test('Subscription fails without product', function () {
	$user = User::factory()->create();

	$response = $this->actingAs($user)
		->post(route('user.subscriptions.store'), [
			'months' => 3,
		]);

	$response->assertSessionHasErrors(['subscribable_product_id']);
});

test('Subscription fails when user has an active subscription', function () {
	$user = User::factory()->create();
	$subscribableProduct = SubscribableProduct::factory()->create();
	$subscription = Subscription::factory()->create([
		'user_id' => $user->id,
		'subscribable_product_id' => $subscribableProduct->id,
		'end_date' => now()->addMonths(1),
	]);
	$response = $this->actingAs($user)
		->post(route('user.subscriptions.store'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 3,
		]);
	// $response->assertSessionHasErrors(['subscribable_product_id']);
	expect($user->subscriptions()->whereIn("status", ["active", "pending"])->get())->toHaveCount(1);
});

test('Users can view their subscriptions', function () {
	$user = User::factory()->create();
	$this->actingAs($user);
	$subscribableProduct = SubscribableProduct::factory()->create();
	$response = $this->actingAs($user)
		->post(route('user.subscriptions.store'), [
			'subscribable_product_id' => $subscribableProduct->id,
			'months' => 3,
		]);

	$response = $this->actingAs($user)->get(route("user.subscriptions.index"))->assertOk();
	// Validate inertia
	$response->assertInertia(
		fn($page) => $page
			->component('user/Subscriptions')
			->has('subscriptions', 1)
	);
});
