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
        'price',
        'image',
        'product_model_id',
        'category_id',
        'status_id'
    ];

    protected $hidden = [
        'category_id',
        'currency_id',
        'product_model_id',
        'status_id',
        'deleted_at',
        'updated_at'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function model()
    {
        return $this->belongsTo(ProductModel::class, 'product_model_id');
    }

    public function status()
    {
        return $this->belongsTo(ProductStatus::class);
    }
}
