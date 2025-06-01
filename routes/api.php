<?php

use App\Http\Requests\RazorpayCallbackRequest;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get('/products', function (Request $request) {
    // $exactCount = \App\Models\Item::where('name', $search)->count();

    // if ($exactCount > 10) {
    //     $results = \App\Models\Item::where('name', $search)->get();
    // } else {
    //     $results = \App\Models\Item::where('name', 'LIKE', "%{$search}%")
    //         ->limit(10)
    //         ->get();
    // }

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
    // if ($request->razorpay_signature != null)
    //     $order->payment_status = "completed";
    // else {
    //     $order->payment_status = "failed";
    //     $order->status = "cancelled";
    // }


    // $order->save();

    return response()->json();
})->name("api.payment.callback");

Route::post("razorpay/callback", function (Request $request) {

    Log::info($request);
    $event = $request->get("event");

    if ($event == "payment.authorized") {
        $order_id = $request->get("payload")['payment']['entity']['order_id'];
        $payment_id = $request->get("payload")['payment']['entity']['id'];
        $order = Order::where("razorpay_order_id", $order_id)->first();
        $order->payment_status = "completed";
        $order->razorpay_payment_id = $payment_id;
        $order->save();

        $order->addEvent("payment", "Payment Success", "Received payment with pay id: " . $payment_id, "system");
    } else if ($event == "payment.failed") {
        $order_id = $request->get("payload")['payment']['entity']['order_id'];
        $payment_id = $request->get("payload")['payment']['entity']['id'];
        $order = Order::where("razorpay_order_id", $order_id)->first();
        $order->payment_status = "failed";
        $order->status = "cancelled";
        $order->razorpay_payment_id = $payment_id;
        $order->save();
        $order->addEvent("payment", "Payment Failed", "Failed to process payment pay id: " . $payment_id, "system");
        $order->addEvent("order", "Order Cancel", "Cancelling order due to payment failure", "system");
    }

    return response()->json();
})->name("api.razorpay.callback");
