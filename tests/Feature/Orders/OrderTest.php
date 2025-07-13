<?php

use App\Models\Cart;
use App\Models\Product;
use App\Models\User;

use function PHPUnit\Framework\assertCount;

test('cart page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/cart');

    $response->assertOk();
});

test('can add to cart', function () {
    $user = User::factory()->create();
    $cart = Cart::create(['user_id' => $user->id]);
    assertCount(0, $cart->items);
    $product = Product::factory()->create();
    $response = $this
        ->actingAs($user)
        ->post(route("user.cart.add", $product->id), []);
    $cart->refresh();

    assertCount(1, $cart->items);
});
