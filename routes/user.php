<?php

use App\Http\Resources\ProductResource;
use App\Models\Product;
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

Route::middleware(['auth', 'verified'])->group(function () {
	Route::get('orders', function () {
		return Inertia::render('user/Orders');
	})->name('user.orders');

	Route::get('change-password', function () {
		return Inertia::render('user/password');
	})->name('user.password');

	Route::get('profile', function () {
		return Inertia::render('user/profile');
	})->name('user.profile');

	Route::get('subscriptions', function () {
		return Inertia::render('user/Subscriptions');
	})->name('user.subscriptions');
});
