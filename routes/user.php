<?php

use App\Http\Controllers\OrderController;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
	return Inertia::render('landing');
})->name('home');

Route::get('/skippy', function () {
	return Inertia::render('skippy');
})->name('skippy');

Route::get('/scikids', function () {
	return Inertia::render('scikids');
})->name('scikids');

Route::get('/shop', function () {
	$products = Product::with("media")->get();
	return Inertia::render('shop', [
		"products" => ProductResource::collection($products)
	]);
})->name('shop');

Route::get('/shop/{product:slug}', function (Product $product) {

	return Inertia::render('product', [
		"product" => new ProductResource($product)
	]);
})->name('shop.product');

Route::middleware(['auth', 'verified'])->name("user.")->group(function () {
	Route::resource("orders", OrderController::class);

	Route::get('orders', function () {
		$orders = Auth::user()->orders;
		return Inertia::render('user/Orders', [
			"orders" => $orders
		]);
	})->name('orders');

	Route::get('change-password', function () {
		return Inertia::render('user/password');
	})->name('password');

	Route::get('profile', function () {
		return Inertia::render('user/profile');
	})->name('profile');

	Route::get('cart', function () {
		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);

		$cartItems = CartItemResource::collection($cart->items()->with("product", "product.media")->get());
		return Inertia::render('user/Cart', [
			"cartItems" => $cartItems,
			"cart" => new CartResource($cart)
		]);
	})->name('cart');

	Route::get('checkout', function () {
		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);

		$cartItems = CartItemResource::collection($cart->items()->with("product", "product.media")->get());
		return Inertia::render('user/Checkout', [
			"cartItems" => $cartItems,
			"cart" => new CartResource($cart)
		]);
	})->name('cart');

	Route::post('cart/{product}', function (Product $product, Request $request) {
		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);


		$quantity = request("quantity", 1);
		if ($quantity <= 0) {
			$existing = $cart->items()->where("product_id", $product->id)->first();
			if ($existing) {
				$existing->delete();
			}
			return back();
		}

		$existing = $cart->items()->where("product_id", $product->id)->first();
		if ($existing) {
			$existing->quantity = $quantity;
			$existing->save();
		} else {
			$cartItem = CartItem::create([
				"product_id" => $product->id,
				'cart_id' => $cart->id,
				'quantity' => $quantity,
			]);
		}

		return back();
	})->name('cart');


	Route::get('subscriptions', function () {
		return Inertia::render('user/Subscriptions');
	})->name('subscriptions');
});
