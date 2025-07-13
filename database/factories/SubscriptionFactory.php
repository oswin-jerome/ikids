<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::inRandomOrder()->first()->id ?? \App\Models\User::factory(),
            'subscribable_product_id' => \App\Models\SubscribableProduct::inRandomOrder()->first()->id ?? \App\Models\SubscribableProduct::factory(),
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->optional()->date(),
            'status' => $this->faker->randomElement(['pending', 'active', 'cancelled', 'expired']),
            'payment_status' => $this->faker->randomElement(['pending', 'completed', 'canceled']),
            'amount' => $this->faker->randomFloat(2, 10, 1000),
            'transaction_id' => $this->faker->optional()->uuid(),
        ];
    }
}
