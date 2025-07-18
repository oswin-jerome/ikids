<?php

use App\Models\Product;
use App\Models\SubscribableProduct;

use function PHPUnit\Framework\assertEquals;
use function PHPUnit\Framework\assertNotNull;

test("Product relationship working", function () {
	$product = Product::factory()->create();
	$subscribable = SubscribableProduct::factory()->create([
		"product_id" => $product->id
	]);
	assertNotNull($subscribable->product);
	assertEquals($product->id, $subscribable->product->id);
});
