<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    /** @use HasFactory<\Database\Factories\SubscriptionFactory> */
    use HasFactory;

    protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function subscribableProduct()
    {
        return $this->belongsTo(SubscribableProduct::class, "subscribable_product_id", "id");
    }
}
