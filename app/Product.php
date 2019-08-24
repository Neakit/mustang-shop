<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'description',
        'category_id',
//        'model_id',
        'price',
        'image',
//        'currency_id',
//        'status_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

//    public function orders(){
//        return $this->hasMany(Order::class);
//    }
}
