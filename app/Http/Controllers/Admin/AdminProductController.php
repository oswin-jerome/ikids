<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Models\Product;
use App\Models\ProductCategory;
use Inertia\Inertia;
use Illuminate\Http\Request;


class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */


    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('sku', 'like', "%{$search}%");
        }

        if ($request->filled('category_id')) {
            $query->where('product_category_id', $request->category_id);
        }

        $products = $query->paginate(10)->withQueryString();

        $categories = ProductCategory::select('id', 'name')->get();

        return Inertia::render('admin/products/Index', [
            'products' => $products,
            'categories' => $categories,
            'filters' => $request->only(['search', 'category_id'])
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return Inertia::render("admin/products/Create", [
            "categories" => ProductCategory::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
    {
        $data = $request->except("cover");
        if ($request->get("product_category_id") == "null") {
            $request->unset("product_category_id");
        }
        $product = Product::create($data);
        if ($request->hasFile("cover")) {
            $product
                ->addMedia($request->file("cover"))
                ->preservingOriginal()
                ->toMediaCollection("cover");
        }

        return to_route('admin.products.index');;
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render("admin/products/Edit", [
            "categories" => ProductCategory::all(),
            "product" => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->except("cover");;
        if ($request->get("product_category_id") == "null") {
            $data["product_category_id"] = null;
        }
        $product->update($data);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        //
    }
}
