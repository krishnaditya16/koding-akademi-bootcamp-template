<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'phone',
        'status',
        'price',
        'url',
        'payment_method',
        'payment_channel',
        'first_name',
        'last_name',
        'email',
        'address_description',
        'address',
        'city',
        'postal_code',
        'country',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

