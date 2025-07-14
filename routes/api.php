<?php

use App\Http\Requests\RazorpayCallbackRequest;
use App\Services\PaymentProcessingService;
use App\Models\Order;
use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get('/products', function (Request $request) {

    $name = $request->get("name");

    $exactMatch = Product::where("name", $name)->count();

    if ($exactMatch > 10) {
        return  Product::where("name", $name)->get();
    } else {
        return Product::where("name", "LIKE", "%" . $name . "%")->limit(10)->get();
    }

    return Product::where("name", "LIKE", "%" . $name . "%")->limit(10)->get();
})->name("api.products");

Route::post("payments/callback/{order:order_id}", function (Order $order, RazorpayCallbackRequest $request) {

    // FIXME: Not working in prod.
    // return response()->json();
    Log::info($order);
    Log::info($request);

    return response()->json();
})->name("api.payment.callback");


Route::post("razorpay/callback", function (Request $request) {
    $service = new PaymentProcessingService();
    Log::info($request);
    $notes = $request->get("payload")['payment']['entity']['notes'];

    if (isset($notes['type']) && $notes['type'] == 'product') {
        Log::info("Razorpay Product Callback");
        $service->processProductPayment($request);
    } else if (isset($notes['type']) && $notes['type'] == 'subscription') {
        Log::info("Razorpay Subscription Callback");
        $service->processSubscriptionPayments($request);
    } else {
        Log::error("Unknown Razorpay Callback Type");
    }

    return response()->json();
})->name("api.razorpay.callback");
