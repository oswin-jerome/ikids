<?php

use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
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

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->prefix("admin")->name("admin.")->group(function () {
    Route::resource("products", AdminProductController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
