<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /** @use HasFactory<\Database\Factories\OrderFactory> */
    use HasFactory;
    protected $guarded = [];

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function addEvent($event_type, $title, $description, $actor)
    {
        $oe = new OrderEvent();
        $oe->order_id = $this->id;
        $oe->event_type = $event_type;
        $oe->title = $title;
        $oe->description = $description;
        $oe->actor = $actor;

        $oe->save();

        return $oe;
    }

    public function orderEvents()
    {
        return $this->hasMany(OrderEvent::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($order) {
            $order->order_id  = 'ORD-' . date('Ymd') . '-' . str_pad(mt_rand(1, 999999), 6, '0', STR_PAD_LEFT);
        });
    }
}
