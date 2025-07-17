<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $product = $this->route('product');
        return [
            "sku" => "required|string|unique:products,sku," . $product->id,
            "name" => "required|string",
            "description" => "required|string",
            "type" => "nullable|in:single,combo",
            "actual_price" => "required|numeric",
            "selling_price" => "required|numeric",
            "cover" => "nullable|image",
            "product_category_id" => "nullable|exists:product_categories,id"
        ];
    }
}
