<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscribableProductRequest;
use App\Http\Requests\UpdateSubscribableProductRequest;
use App\Models\Product;
use App\Models\SubscribableProduct;

class AdminSubscribableProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscribableProducts = SubscribableProduct::withCount("subscriptions")->get();
        // return $subscribableProducts;
        return inertia('admin/SubscribableProduct/Index', [
            'subscribableProducts' => $subscribableProducts,
        ]);
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
    public function store(StoreSubscribableProductRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SubscribableProduct $subscribableProduct)
    {
        return inertia('admin/SubscribableProduct/Show', [
            'subscribableProduct' => $subscribableProduct,
            "products" => Product::all(["id", "name"])
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubscribableProduct $subscribableProduct)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscribableProductRequest $request, SubscribableProduct $subscribableProduct)
    {
        $subscribableProduct->update($request->validated());
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubscribableProduct $subscribableProduct)
    {
        //
    }
}
