<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Services\RazorpayService;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Razorpay\Api\Api;

class AdminSubscriptionController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $subscriptions = Subscription::with(['customer', 'subscribableProduct'])
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('admin/Subscriptions/Index', [
            'subscriptions' => $subscriptions
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
    public function store(StoreSubscriptionRequest $request)
    {
        // 
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscription $subscription)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscription $subscription)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscriptionRequest $request, Subscription $subscription)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscription $subscription)
    {
        //
    }
}
