<?php

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Log;

use function PHPUnit\Framework\assertCount;
use function PHPUnit\Framework\assertEquals;

test('cart page is displayed', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->get('/cart');

    $response->assertOk();
});

test('can add to cart', function () {
    $user = User::factory()->create();
    $cart = Cart::create(['user_id' => $user->id]);
    assertCount(0, $cart->items);
    $product = Product::factory()->create();
    $response = $this
        ->actingAs($user)
        ->post(route("user.cart.add", $product->id), []);
    $cart->refresh();

    assertCount(1, $cart->items);
});


test('Razorpay webhook can process orders', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    $product->current_stock = 10;
    $product->save();
    $order = new Order();
    $order->total_amount = 100;
    $order->type = "direct";
    $order->user_id = $user->id;
    $order->first_name = "A";
    $order->last_name = "B";
    $order->phone_number = "123";
    $order->address = "123";
    $order->postal_code = "123";
    $order->city = "123";
    $order->razorpay_order_id = "order_QsbrvyqV5tHvmW";
    $order->save();
    $orderItem = new OrderItem();
    $orderItem->order_id = $order->id;
    $orderItem->product_id = $product->id;
    $orderItem->price = 500;
    $orderItem->quantity = 1;
    $orderItem->save();

    $response = $this->post(route("api.razorpay.callback"), [
        "entity" => "event",
        "account_id" => "acc_ENflEsJMwta13P",
        "event" => "payment.authorized",
        "contains" => ["payment"],
        "payload" => [
            "payment" => [
                "entity" => [
                    "id" => "pay_QsbtJcwY43a6fs",
                    "entity" => "payment",
                    "amount" => 42793,
                    "currency" => "INR",
                    "status" => "authorized",
                    "invoice_id" => null,
                    "international" => false,
                    "method" => "upi",
                    "amount_refunded" => 0,
                    "refund_status" => null,
                    "captured" => false,
                    "description" => "i-Kids Subscription Payment",
                    "card_id" => null,
                    "bank" => null,
                    "wallet" => null,
                    "vpa" => "success@razorpay",
                    "email" => "john.doe@example.com",
                    "contact" => "+919999999999",
                    "order_id" => $order->razorpay_order_id,
                    "notes" => [
                        // "months" => 1,
                        // "user_id" => $user->id,
                        // "subscribable_product_id" => $subscribableProduct->id,
                        "type" => "product"
                    ],
                    "fee" => null,
                    "tax" => null,
                    "error_code" => null,
                    "error_description" => null,
                    "error_source" => null,
                    "error_step" => null,
                    "error_reason" => null,
                    "acquirer_data" => [
                        "rrn" => "870314994031",
                        "upi_transaction_id" => "5B2FFE77BDBAA01D72CF49707F1631D5"
                    ],
                    "created_at" => 1752422458,
                    "upi" => [
                        "vpa" => "success@razorpay"
                    ]
                ]
            ]
        ],
        "created_at" => 1752422458
    ]);
    Log::info($response->getContent());
    $response->assertOk();
    $order->refresh();
    assertEquals("completed", $order->payment_status);
    $product->refresh();
    assertEquals(9, $product->current_stock);
});

test('Razorpay webhook can process orders and ignores negative stocks', function () {
    $user = User::factory()->create();
    $product = Product::factory()->create();
    $product->current_stock = 0;
    $product->save();
    $order = new Order();
    $order->total_amount = 100;
    $order->type = "direct";
    $order->user_id = $user->id;
    $order->first_name = "A";
    $order->last_name = "B";
    $order->phone_number = "123";
    $order->address = "123";
    $order->postal_code = "123";
    $order->city = "123";
    $order->razorpay_order_id = "order_QsbrvyqV5tHvmW";
    $order->save();
    $orderItem = new OrderItem();
    $orderItem->order_id = $order->id;
    $orderItem->product_id = $product->id;
    $orderItem->price = 500;
    $orderItem->quantity = 1;
    $orderItem->save();

    $response = $this->post(route("api.razorpay.callback"), [
        "entity" => "event",
        "account_id" => "acc_ENflEsJMwta13P",
        "event" => "payment.authorized",
        "contains" => ["payment"],
        "payload" => [
            "payment" => [
                "entity" => [
                    "id" => "pay_QsbtJcwY43a6fs",
                    "entity" => "payment",
                    "amount" => 42793,
                    "currency" => "INR",
                    "status" => "authorized",
                    "invoice_id" => null,
                    "international" => false,
                    "method" => "upi",
                    "amount_refunded" => 0,
                    "refund_status" => null,
                    "captured" => false,
                    "description" => "i-Kids Subscription Payment",
                    "card_id" => null,
                    "bank" => null,
                    "wallet" => null,
                    "vpa" => "success@razorpay",
                    "email" => "john.doe@example.com",
                    "contact" => "+919999999999",
                    "order_id" => $order->razorpay_order_id,
                    "notes" => [
                        // "months" => 1,
                        // "user_id" => $user->id,
                        // "subscribable_product_id" => $subscribableProduct->id,
                        "type" => "product"
                    ],
                    "fee" => null,
                    "tax" => null,
                    "error_code" => null,
                    "error_description" => null,
                    "error_source" => null,
                    "error_step" => null,
                    "error_reason" => null,
                    "acquirer_data" => [
                        "rrn" => "870314994031",
                        "upi_transaction_id" => "5B2FFE77BDBAA01D72CF49707F1631D5"
                    ],
                    "created_at" => 1752422458,
                    "upi" => [
                        "vpa" => "success@razorpay"
                    ]
                ]
            ]
        ],
        "created_at" => 1752422458
    ]);
    Log::info($response->getContent());
    $response->assertOk();
    $order->refresh();
    assertEquals("completed", $order->payment_status);
    $product->refresh();
    assertEquals(-1, $product->current_stock);
});
