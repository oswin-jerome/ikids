<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateSubscribableProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // TODO: Admin authorization logic
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
            'name' => ['required', 'string', 'max:255'],
            'price_per_month' => ['required', 'numeric', 'min:0'],
            'description' => ['nullable', 'string'],
            'slug' => ['required', 'string', 'max:255'],
            'sku' => ['required', 'string', 'max:100'],
            'is_active' => ['required', 'boolean'],
            'product_id' => "required|exists:products,id",
        ];
    }
}
