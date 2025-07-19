<?php

use App\Models\Product;
use App\Models\SubscribableProduct;
use App\Models\User;
use App\Services\SubscriptionService;
use Carbon\Carbon;

use function PHPUnit\Framework\assertEquals;

test('Scheduler able to create order', function () {
    // Carbon::setTestNow(Carbon::parse('2025-07-19'));
    $user = User::factory()->create();
    $this->actingAs($user);
    $product = Product::factory()->create();
    $subscribableProduct = SubscribableProduct::factory()->create();

    $service = new SubscriptionService();
    $subscription = $service->createSubscription($user, $subscribableProduct, 12, [], "123");

    assertEquals(1, $user->subscriptions()->count());
    assertEquals(0, $user->orders()->count());
    $service->processMonthlySubscriptions();
    $subscription->refresh();
    assertEquals(1, $user->orders()->count());
    assertEquals($subscription->last_processed, now()->toDateTimeString());
});


test('Scheduler does not over order', function () {
    $now = now();
    Carbon::setTestNow($now);
    $user = User::factory()->create();
    $this->actingAs($user);
    $product = Product::factory()->create();
    $subscribableProduct = SubscribableProduct::factory()->create();
    $months = 12;

    $service = new SubscriptionService();
    $subscription = $service->createSubscription($user, $subscribableProduct, $months, [], "123");
    assertEquals(1, $user->subscriptions()->count());
    assertEquals(0, $user->orders()->count());
    for ($i = 0; $i < $months; $i++) {
        $service->processMonthlySubscriptions();
        Carbon::setTestNow($now->addMonth());
    }
    assertEquals($months, $user->orders()->count());
    $service->processMonthlySubscriptions();
    $service->processMonthlySubscriptions();
    assertEquals($months, $user->orders()->count());
});


test('Scheduler prevents duplicate order', function () {
    $now = now();
    Carbon::setTestNow($now);
    $user = User::factory()->create();
    $this->actingAs($user);
    $product = Product::factory()->create();
    $subscribableProduct = SubscribableProduct::factory()->create();

    $service = new SubscriptionService();
    $subscription = $service->createSubscription($user, $subscribableProduct, 12, [], "123");
    $service->processMonthlySubscriptions();
    $service->processMonthlySubscriptions();
    assertEquals(1, $user->orders()->count());
});
