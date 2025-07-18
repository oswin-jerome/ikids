<?php

use App\Models\Order;
use App\Services\SubscriptionService;
use Carbon\Carbon;
use Illuminate\Container\Attributes\Log;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log as FacadesLog;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');


Schedule::call(function (SubscriptionService $subscriptionService) {
    FacadesLog::info('Subscription scheduler running ' . now());
    $subscriptionService->processMonthlySubscriptions();
    FacadesLog::info('Subscription scheduler completed ' . now());
})->everyMinute()->name('Subscription Schedulers')->withoutOverlapping();

Schedule::call(function () {
    $cutoff = Carbon::now()->subDays(2);

    $deleted = Order::where("payment_status", "pending")
        ->where("status", "pending")
        ->where("created_at", "<", $cutoff)
        ->delete();

    FacadesLog::info("Stale orders deleted", ['count' => $deleted]);
})->everyMinute()->name('Stale remover')->withoutOverlapping();
