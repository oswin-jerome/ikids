<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubscribableProduct extends Model
{
    /** @use HasFactory<\Database\Factories\SubscribableProductFactory> */
    use HasFactory;

    protected $guarded = [];

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
