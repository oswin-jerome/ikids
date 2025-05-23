<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/products', function (Request $request) {
    // $exactCount = \App\Models\Item::where('name', $search)->count();

    // if ($exactCount > 10) {
    //     $results = \App\Models\Item::where('name', $search)->get();
    // } else {
    //     $results = \App\Models\Item::where('name', 'LIKE', "%{$search}%")
    //         ->limit(10)
    //         ->get();
    // }

    $name = $request->get("name");

    $exactMatch = Product::where("name", $name)->count();

    if ($exactMatch > 10) {
        return  Product::where("name", $name)->get();
    } else {
        return Product::where("name", "LIKE", "%" . $name . "%")->limit(10)->get();
    }

    return Product::where("name", "LIKE", "%" . $name . "%")->limit(10)->get();
})->name("api.products");
