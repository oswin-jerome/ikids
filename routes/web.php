<?php

use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\Admin\AdminOrdersController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminStockController;
use App\Http\Controllers\Admin\AdminSubscribableProductController;
use App\Http\Controllers\Admin\AdminSubscriptionController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\ProductCategory;
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
    Route::resource("orders", AdminOrdersController::class);
    Route::post("orders/{order}/status", [AdminOrdersController::class, 'updateStatus'])->name("orders.update.status");
    Route::get('orders/{order:order_id}/shipping-label', [AdminOrdersController::class, 'showShippingLabel'])
        ->name('orders.shipping.label');

    Route::resource("subscribable-products", AdminSubscribableProductController::class);
    Route::resource("subscriptions", AdminSubscriptionController::class);
    Route::resource("users", AdminCustomerController::class);
});


require __DIR__ . '/user.php';
require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
