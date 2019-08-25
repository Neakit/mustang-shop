<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductModel extends Model
{
    public function product()
    {
        return $this->hasMany(Product::class, 'model_id', 'model_id');
    }
}
