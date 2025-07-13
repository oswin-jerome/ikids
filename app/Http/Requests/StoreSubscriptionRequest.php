<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreSubscriptionRequest extends FormRequest
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
            "razorpay_order_id" => "required|string",
            "razorpay_payment_id" => "required|string",
            "razorpay_signature" => "required|string",
            "subscribable_product_id" => "required|exists:subscribable_products,id",
            "months" => "required|integer|min:1|max:12",
        ];
    }
}
