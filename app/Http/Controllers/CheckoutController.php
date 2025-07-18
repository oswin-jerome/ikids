<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreCheckoutRequest;
use App\Http\Resources\CartItemResource;
use App\Http\Resources\CartResource;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderEvent;
use App\Notifications\DirectOrderPlaced;
use App\Services\RazorpayService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CheckoutController extends Controller
{

    public function showCheckoutPage()
    {

        $cart = Cart::firstOrCreate([
            'user_id' => Auth::id()
        ]);

        $cartItems = CartItemResource::collection($cart->items()->with("product", "product.media")->get());
        return Inertia::render('user/Checkout', [
            "cartItems" => $cartItems,
            "cart" => new CartResource($cart)
        ]);
    }

    /**
     * Created a order in db and razorpay and returns payment info
     * Method: POST
     */
    public function checkoutOrderAndCreatePayment(StoreCheckoutRequest $request, RazorpayService $razorpay)
    {
        $data = $request->validate([
            "first_name" => "required|string",
            "last_name" => "required|string",
            "address" => "required|string",
            "city" => "required|string",
            "postal_code" => "required|string",
            "phone_number" => "required|string",
        ]);
        Log::info("Create order invoked for : " . $request);

        try {
            DB::beginTransaction();
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
                // TODO: Update product stock. or update once payment is confirmed
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

            $data = $razorpay->createOrder([
                'receipt'         => $order->order_id,
                'amount'          => $totalAmount * 100,
                'currency'        => 'INR',
                'notes' => [
                    'type' => "product"
                ],
            ]);
            $order->razorpay_order_id = $data->id;
            $order->save();

            DB::commit();
            return response()->json([
                "orderId" => $data->id,
                "db_order_id" => $order->order_id
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Error while creating order");
            Log::error($e);

            return response()->json([
                "message" => "Error while creating order",
                "exception" => $e->getMessage()
            ], 422);
        }
    }
}
