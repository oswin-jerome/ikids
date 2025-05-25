<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Models\Order;
use App\Models\Product;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request)
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();
            $productIds = $request->input('products', []);
            $quantities = $request->input('quantities', []);

            if (count($productIds) !== count($quantities)) {
                throw new \Exception('Product and quantity arrays must match');
            }

            $order = new Order();
            $order->user_id = $user->id;
            $order->type = "direct";
            $order->total_amount = 0; // Initialize to 0
            $order->save();

            $totalAmount = 0;

            foreach ($productIds as $index => $productId) {
                $product = Product::findOrFail($productId);
                $quantity = $quantities[$index] ?? 1;

                if ($quantity < 1) {
                    continue; // Skip invalid quantities
                }

                $orderItem = $order->orderItems()->create([
                    "product_id" => $product->id,
                    "quantity" => $quantity,
                    "price" => $product->selling_price
                ]);

                $totalAmount += $product->selling_price * $quantity;
            }

            if ($totalAmount <= 0) {
                throw new \Exception('Order must contain at least one valid product');
            }

            $order->total_amount = $totalAmount;
            $order->save();

            DB::commit();

            return back()->with('success', 'Order created successfully!');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Order creation failed: ' . $e->getMessage());

            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
