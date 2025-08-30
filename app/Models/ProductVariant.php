<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $table = 'product_variants';
    
    protected $fillable = [
        'product_id',
        'variant_name',
        'stock',
        'color',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
