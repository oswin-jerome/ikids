<?php

use App\Http\Requests\RazorpayCallbackRequest;
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


Route::post("razorpay/subscription/callback", function (Request $request) {
    Log::info("Razorpay Subscription Callback");
    Log::info($request);
    $event = $request->get("event");
    if ($event == "payment.authorized") {

        $months = $request->input('months', 1);
        $notes = $request->get("payload")['payment']['entity']['notes'];
        $order_id = $notes['order_id'];
        $subscribable_product_id = $notes['subscribable_product_id'];
        $user_id = $notes['user_id'];
        $user = User::findOrFail($user_id);


        $activeSubscription = $$user->subscriptions()
            ->whereIn('status', ['active', 'pending'])
            ->where("transaction_id", $request->get("payload")['payment']['entity']['id'])
            ->exists();
        // Check if already payment processed though callback
        if ($activeSubscription) {
            Log::info("Subscription already in place for user: " . $user->id);
            return response()->json([
                'message' => "Subscription already in place."
            ]);
        }
        $subscribableProductId = $request->input('subscribable_product_id');
        $subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);
        $subscription = $user->subscriptions()->create([
            'subscribable_product_id' => $subscribableProductId,
            "start_date" => now(),
            "end_date" => now()->addMonths($months),
            "amount" => $subscribableProduct->price_per_month * $months,
            "transaction_id" => $request->get("payload")['payment']['entity']['id'],
        ]);
    }
    Log::info("Razorpay Subscription Callback Completed");
    return response()->json();
})->name("api.razorpay.subscription.callback");
