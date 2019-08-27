<?php

namespace App\Http\Controllers;

use App\ProductModel;
use Illuminate\Http\Request;

class ProductModelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $models = ProductModel::all();
        return response()->json($models, 200);
    }

}
