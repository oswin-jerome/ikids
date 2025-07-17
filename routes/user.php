<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Requests\User\StoreCheckoutRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Http\Resources\ProductCategoryResource;
use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderEvent;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\SubscribableProduct;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Razorpay\Api\Api;

Route::get('/', function () {
	$categories = ProductCategory::with("products")->get();
	return Inertia::render('landing', [
		"categories" => ProductCategoryResource::collection($categories)
	]);
})->name('home');

Route::get('/skippy', function () {
	$subscribableProduct = SubscribableProduct::where("slug", "skippy")->first();
	return Inertia::render('skippy', [
		'subscribableProduct' => $subscribableProduct,
	]);
})->name('skippy');

Route::get('/scikids', function () {
	$subscribableProduct = SubscribableProduct::where("slug", "scikids")->first();
	return Inertia::render('scikids', [
		'subscribableProduct' => $subscribableProduct,
	]);
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
	Route::resource("orders", OrderController::class)->parameters([
		'orders' => 'order:order_id'
	]);
	Route::get('orders/{order:order_id}/invoice', [OrderController::class, 'showInvoice'])
		->name('orders.invoice');


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

	Route::get("checkout", [CheckoutController::class, "showCheckoutPage"])->name("checkout");
	Route::post("checkout", [CheckoutController::class, "checkoutOrderAndCreatePayment"])->name("checkout");


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
			return redirect()->route("user.cart");
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

		return redirect()->route("user.cart");
	})->name('cart.add');




	Route::resource("subscriptions", SubscriptionController::class);
	Route::post('subscriptions/create_order', [SubscriptionController::class, 'createOrder'])
		->name('subscriptions.create_order');
});
