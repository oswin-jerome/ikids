<?php

use App\Http\Controllers\Admin\AdminProductController;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/shop', function () {
    $products = Product::all();
    return Inertia::render('shop', [
        "products" => $products
    ]);
})->name('shop');
Route::get('/shop/{product}', function (Product $product) {

    return Inertia::render('product', [
        "product" => $product
    ]);
})->name('shop.product');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified'])->prefix("admin")->name("admin.")->group(function () {
    Route::resource("products", AdminProductController::class);
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
