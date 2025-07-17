<?php

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind a different classes or traits.
|
*/

use App\Services\RazorpayService;
use Illuminate\Support\Facades\Log;

pest()->extend(Tests\TestCase::class)
    ->use(Illuminate\Foundation\Testing\RefreshDatabase::class)
    ->in('Feature');

uses()->beforeEach(function () {
    $razorpay = Mockery::mock(RazorpayService::class);
    $razorpay->shouldReceive('createOrder')->andReturnUsing(function ($args) {
        Log::info("Mocking payment");
        return (object)[
            'id' => 'order_123',
            "subscribable_product_id" => $args['notes']['subscribable_product_id'] ?? null,
            "months" => 1,
        ];
    });
    $this->app->instance(RazorpayService::class, $razorpay);
    $this->razorpay = $razorpay;
})->in(__DIR__);

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function something()
{
    // ..
}

// function mockPayment(){
//     $razorpay = Mockery::mock(RazorpayService::class);
//     $razorpay->shouldReceive('createOrder')->andReturnUsing(function ($args) {
//         Log::info($args);
//         return (object)[
//             'id' => 'order_123',
//             "subscribable_product_id" => $args['notes']['subscribable_product_id'] ?? null,
//             "months" => 1,
//         ];
//     });
//     $this->app->instance(RazorpayService::class, $razorpay);
//     $this->razorpay = $razorpay;
// }