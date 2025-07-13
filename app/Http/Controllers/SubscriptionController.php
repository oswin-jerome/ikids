<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
        $activeSubscription = $request->user()->subscriptions()
            ->whereIn('status', ['active', 'pending'])
            ->exists();
        if ($activeSubscription) {
            return redirect()->back()->withErrors(['subscribable_product_id' => 'You already have an active subscription.']);
        }

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
}
