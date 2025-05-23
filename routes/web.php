<?php

use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminStockController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])->prefix("admin")->name("admin.")->group(function () {
    Route::resource("products", AdminProductController::class);
    Route::resource("stocks", AdminStockController::class);
});


require __DIR__ . '/user.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
