<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubscribableProduct>
 */
class SubscribableProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'is_active' => $this->faker->boolean(90),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->optional()->paragraph,
            'slug' => $this->faker->unique()->slug,
            'sku' => $this->faker->unique()->bothify('SKU-#####'),
            'price_per_month' => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
