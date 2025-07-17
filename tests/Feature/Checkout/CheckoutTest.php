<?php

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertEquals;

test('Can process checkout', function () {
	$user = User::factory()->create();
	$product = Product::factory()->create();
	$product->current_stock = 10;
	$product->save();
	$cart = Cart::create(['user_id' => $user->id]);
	$this
		->actingAs($user)
		->post(route("user.cart.add", $product->id), []);
	$cart->refresh();
	assertCount(1, $cart->items);

	$res = $this->actingAs($user)->post(route('user.checkout'), [
		"first_name" => 'Oswin',
		"last_name" => 'Jerome',
		"address" => 'address',
		"city" => 'City',
		"postal_code" => '1123',
		"phone_number" => '345343456',
	]);

	$cart->refresh();
	// assertCount(0, $cart->items);

	$user->refresh();
	assertCount(1, $user->orders);
	$order = $user->orders()->first();
	assertEquals("pending", $order->payment_status);
	assertEquals("pending", $order->status);
});


test('Can handle missing address info', function () {
	$user = User::factory()->create();
	$product = Product::factory()->create();
	$product->current_stock = 10;
	$product->save();
	$cart = Cart::create(['user_id' => $user->id]);
	$this
		->actingAs($user)
		->post(route("user.cart.add", $product->id), []);
	$cart->refresh();
	assertCount(1, $cart->items);

	$res = $this->actingAs($user)->post(route('user.checkout'), [
		"first_name" => 'Oswin',
		"last_name" => 'Jerome',
	]);

	$cart->refresh();
	// assertCount(0, $cart->items);
	$res->assertStatus(302);
	$user->refresh();
	assertCount(0, $user->orders);
});
