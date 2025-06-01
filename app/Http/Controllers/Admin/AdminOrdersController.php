<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderItemResource;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $status = request("status", "all");
        $payment_status = request("payment_status", "all");
        $orders = new Order;
        if ($status != "all") {
            $orders = $orders->where("status", $status);
        }
        if ($payment_status != "all") {
            $orders = $orders->where("payment_status", $payment_status);
        }
        $orders = $orders->orderBy("created_at", "desc");
        $orders = $orders->get();

        return Inertia::render("admin/orders/Index", [
            "orders" => $orders,
            "status" => $status
        ]);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $orderItems = $order->orderItems()->with("product")->get();
        return Inertia::render("admin/orders/View", [
            "order" => $order->load("customer"),
            "orderItems" => OrderItemResource::collection($orderItems)
        ]);
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
    public function update(Request $request, Order $order)
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
