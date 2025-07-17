<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderItemResource;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\PdfGeneratorService;
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
        $type = request("type", "all");
        $orders = new Order;

        $orders = $orders->where("order_id", "like", "%" . request("order_id", "") . "%");

        if ($status != "all") {
            $orders = $orders->where("status", $status);
        }
        if ($payment_status != "all") {
            $orders = $orders->where("payment_status", $payment_status);
        }
        if ($type != "all") {
            $orders = $orders->where("type", $type);
        }
        $orders = $orders->with("customer")->orderBy("created_at", "desc");
        $orders = $orders->paginate()->withQueryString();;

        // return $orders;

        return Inertia::render("admin/orders/Index", [
            "ordersPage" => $orders,
            "status" => $status,
            "payment_status" => $payment_status,
            "type" => $type,
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
        $orderEvents = $order->orderEvents;
        // return $orderEvents;
        return Inertia::render("admin/orders/View", [
            "order" => $order->load("customer"),
            "orderItems" => OrderItemResource::collection($orderItems),
            "orderEvents" => $orderEvents
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
     * Update the specified resource in storage.
     */
    public function updateStatus(Request $request, Order $order)
    {
        $data = $request->validate([
            "status" => "required|string",
            "description" => "required|string",
        ]);

        $status = $order->status;

        $order->status = $data['status'];
        $order->save();

        $order->addEvent("order", "Order status changed from " . $status . " to " . $data['status'], $data['description'], "admin");

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }

    public function showShippingLabel(Order $order, PdfGeneratorService $pdfGeneratorService)
    {

        return $pdfGeneratorService->generateOrderShippingLabel($order);
    }
}
