<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    protected $fillable = [
        'title'
    ];

    public function product()
    {
        return $this->hasMany(Product::class, 'product_model_id');
    }
}
