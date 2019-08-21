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
        'model',
        'image',
        'category',
        'currency',
        'status',
        'price', 
    ];

            

    public function orders(){
        return $this->hasMany(Order::class);
    }
}
