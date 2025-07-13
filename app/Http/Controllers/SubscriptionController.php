<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Models\SubscribableProduct;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
        $subscriptions = $user->subscriptions()->with('subscribableProduct')->orderBy("created_at", "desc")->get();
        // return $subscriptions;
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
        $razorpayPaymentId = $request->input('razorpay_payment_id');
        $razorpayOrderId = $request->input('razorpay_order_id');
        $razorpaySignature = $request->input('razorpay_signature');

        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));

        // Validate payment signature
        if (!$razorpayOrderId || !$razorpayPaymentId || !$razorpaySignature) {
            Log::error('Missing Razorpay order ID, payment ID, or signature.');
            return response()->json([
                'error' => 'Missing Razorpay order ID, payment ID, or signature.'
            ], 422);
        }

        try {
            $api->utility->verifyPaymentSignature([
                'razorpay_order_id' => $razorpayOrderId,
                'razorpay_payment_id' => $razorpayPaymentId,
                'razorpay_signature' => $razorpaySignature,
            ]);
            Log::info('Razorpay payment signature verified successfully.');
        } catch (\Exception $e) {
            Log::error('Razorpay payment verification failed: ' . $e->getMessage());
            return response()->json([
                'error' => 'Payment verification failed. Please try again.'
            ], 422);
        }

        // Get order details from Razorpay
        $order = $api->order->fetch($razorpayOrderId);
        $notes = $order->notes;
        Log::info('Razorpay order details:', ['order' => $order]);

        // no months don't proceed
        if (!isset($notes['months']) || !isset($notes['subscribable_product_id'])) {
            Log::error('Invalid subscription details: ' . json_encode($notes));
            return response()->json([
                'error' => 'Invalid subscription details provided.'
            ], 422);
        }

        $months = isset($notes['months']) ? (int)$notes['months'] : 1;
        $subscribableProductId = $notes['subscribable_product_id'] ?? $request->input('subscribable_product_id');
        $user = $request->user();

        // Check if already payment processed though callback
        $activeSubscription = $user->subscriptions()
            ->whereIn('status', ['active', 'pending'])
            ->where("transaction_id", $razorpayPaymentId)
            ->exists();
        if ($activeSubscription) {
            return response()->json([
                'error' => "Subscription already in place."
            ], 422);
        }
        Log::info('Creating subscription for user:', [
            'user_id' => $user->id,
            'subscribable_product_id' => $subscribableProductId,
            'months' => $months,
            "status" => 'active',
        ]);

        $subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);
        $subscription = $user->subscriptions()->create([
            'subscribable_product_id' => $subscribableProductId,
            "start_date" => now(),
            "end_date" => now()->addMonths($months),
            "amount" => $subscribableProduct->price_per_month * $months,
            "transaction_id" => $razorpayPaymentId,
            "months" => $months,
            "status" => 'active',

        ]);

        return response()->json([
            'message' => 'Subscription created successfully.',
            'subscription' => $subscription,
        ]);
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
        Log::info('Creating subscription order:', $request->all());
        $subscribableProductId = $request->input('subscribable_product_id');
        $months = $request->input('months', 1);
        $user = Auth::user();

        $activeSubscription = $request->user()->subscriptions()
            ->whereIn('status', ['active'])
            ->exists();
        if ($activeSubscription) {
            Log::error('User already has an active subscription.');
            return response()->json([
                'message' => "You already have an active subscription."
            ], 422);
        }

        $subscribableProduct = SubscribableProduct::findOrFail($subscribableProductId);
        $api = new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
        Log::info('Creating Razorpay order for subscription:', [
            'subscribable_product_id' => $subscribableProductId,
            'months' => $months,
            'user_id' => $user->id,
        ]);
        $data = $api->order->create([
            'receipt'         => 'sub-' . $subscribableProduct->id . '-' . time(),
            'amount'          => $subscribableProduct->price_per_month * $months * 100, // amount in paise
            'currency'        => 'INR',
            'notes' => [
                'subscribable_product_id' => $subscribableProductId,
                'user_id' => $user->id,
                'months' => $months,
                "type" => "subscription"
            ],
        ]);

        Log::info('Razorpay order created:', ['order' => $data]);

        return response()->json([
            'order_id' => $data->id,
        ]);
    }
}
