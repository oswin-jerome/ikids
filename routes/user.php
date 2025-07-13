<?php

use App\Http\Controllers\OrderController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Requests\User\StoreCheckoutRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Http\Resources\ProductResource;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\OrderEvent;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Razorpay\Api\Api;

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
		/** @var \App\Models\User $user */
		$user = Auth::user();
		$orders = $user->orders()->orderBy("created_at", "desc")->get();
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
	})->name('checkout');
	Route::get('checkout/{orderId}/{db_order_id}', function ($orderId, $db_order_id) {
		// FIXME: validate order ids
		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);

		$cartItems = CartItemResource::collection($cart->items()->with("product", "product.media")->get());
		return Inertia::render('user/Checkout', [
			"cartItems" => $cartItems,
			"cart" => new CartResource($cart),
			"order_id" => $orderId,
			"db_order_id" => $db_order_id
		]);
	})->name('checkout.payment');

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

	Route::post("checkout", function (StoreCheckoutRequest $request) {
		$request->validated();
		$user = Auth::user();
		$order = new Order();
		$order->user_id = $user->id;
		$order->type = "direct";
		$order->total_amount = 0; // Initialize to 0

		// ADDRESS
		$order->first_name = $request->first_name;
		$order->last_name = $request->last_name;
		$order->address = $request->address;
		$order->city = $request->city;
		$order->postal_code = $request->postal_code;
		$order->phone_number = $request->phone_number;

		$order->save();
		$totalAmount = 0;
		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);
		foreach ($cart->items as  $cartItem) {
			$product = $cartItem->product;
			$quantity = $cartItem->quantity;

			if ($quantity < 1) {
				continue; // Skip invalid quantities
			}

			$orderItem = $order->orderItems()->create([
				"product_id" => $product->id,
				"quantity" => $quantity,
				"price" => $product->selling_price
			]);

			$totalAmount += $product->selling_price * $quantity;
			// TODO: Update product stock.
		}

		$order->total_amount = $totalAmount;
		$order->save();

		// Create Order Event
		$oe = new OrderEvent();
		$oe->order_id = $order->id;
		$oe->event_type = "order";
		$oe->title = "Checkout";
		$oe->description = "Order checked out for payments";
		$oe->actor = "customer";

		$oe->save();

		$api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
		$data = $api->order->create([
			'receipt'         => $order->order_id,
			'amount'          => 100 * 100, // amount in paise
			'currency'        => 'INR',
		]);

		$cart = Cart::firstOrCreate([
			'user_id' => Auth::id()
		]);
		$order->razorpay_order_id = $data->id;
		$order->save();
		return redirect()->route("user.checkout.payment", [
			"orderId" => $data->id,
			"db_order_id" => $order->order_id
		]);
	})->name("checkout");


	Route::resource("subscriptions", SubscriptionController::class);
});
