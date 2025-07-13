<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sku' => $this->faker->unique()->word,
            'slug' => $this->faker->unique()->slug,
            'name' => $this->faker->name,
            'description' => $this->faker->paragraph,
            'type' => $this->faker->randomElement(['single', 'combo']),
            'actual_price' => $this->faker->randomFloat(2, 100, 100000000),
            'current_stock' => $this->faker->numberBetween(0, 100),
            'selling_price' => $this->faker->randomFloat(2, 10, 1000),
            'created_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
            'updated_at' => $this->faker->dateTimeBetween('-1 years', 'now'),
        ];
    }
}
