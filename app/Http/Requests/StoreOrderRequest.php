<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreOrderRequest extends FormRequest
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
        return [
            "products" => "required|array|min:1",
            "products.*" => "required|exists:products,id",
            "quantities" => "required|array|min:1",
            "quantities.*" => "required|integer|min:1"
        ];
    }

    public function messages()
    {
        return [
            'products.required' => 'At least one product is required',
            'products.*.exists' => 'One or more selected products are invalid',
            'quantities.*.min' => 'Quantity must be at least 1',
        ];
    }
}


// return [
//     "product_id" => [
//         "required",
//         "exists:products,id",
//         function ($attribute, $value, $fail) {
//             $product = Product::find($value);
//             if ($product && $product->status !== 'available') {
//                 $fail('The selected product is not available for purchase.');
//             }
//         }
//     ]
// ];
