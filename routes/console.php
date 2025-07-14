<?php

use App\Services\SubscriptionService;
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
})->dailyAt("23:55")->name('Subscription Scheduler')->withoutOverlapping();
