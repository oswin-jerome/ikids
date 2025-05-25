<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);
        $subTotal = 0;
        foreach ($this->items as $value) {
            $subTotal += $value->product->selling_price * $value->quantity;
        }
        $data['sub_total'] = $subTotal;
        $data['tax'] = 0;
        $data['shipping'] = 0;
        $data['total'] = $data['sub_total'] - $data['tax'] - $data['shipping'];
        return $data;
    }
}
