<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Razorpay\Api\Api;

class SubscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $subscriptions = $user->subscriptions()->with('subscribableProduct')->get();
        return Inertia::render('user/Subscriptions', [
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

        $months = $request->input('months', 1);
        $user = $request->user();

        $subscribableProductId = $request->input('subscribable_product_id');
        $subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);
        $subscription = $user->subscriptions()->create([
            'subscribable_product_id' => $subscribableProductId,
            "start_date" => now(),
            "end_date" => now()->addMonths($months),
            "amount" => $subscribableProduct->price_per_month * $months,
        ]);


        return redirect()->back();
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

    /**
     * Create an order for the subscription.
     */
    public function createOrder(Request $request)
    {
        $request->validate([
            'subscribable_product_id' => 'required|exists:subscribable_products,id',
            'months' => 'required|integer|min:1',
        ]);
        $subscribableProductId = $request->input('subscribable_product_id');
        $months = $request->input('months', 1);
        $user = Auth::user();

        $activeSubscription = $request->user()->subscriptions()
            ->whereIn('status', ['active', 'pending'])
            ->exists();
        if ($activeSubscription) {
            return response()->json([
                'error' => "You already have an active subscription."
            ]);
        }

        $subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);
        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        $data = $api->order->create([
            'receipt'         => 'sub-' . $subscribableProduct->id,
            'amount'          => $subscribableProduct->price_per_month * $months * 100, // amount in paise
            'currency'        => 'INR',
            'notes' => [
                'subscribable_product_id' => $subscribableProductId,
                'user_id' => $user->id,
                'months' => $months,
            ],
        ]);

        return response()->json([
            'order_id' => $data->id,
        ]);
    }
}
