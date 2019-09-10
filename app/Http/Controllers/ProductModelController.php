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
    public function index(Request $request)
    {
        $models = ProductModel::where(function($q) use ($request) {
            if(isset($request->title)){
                $q->where('title', 'like', "%{$request->title}%");
            }
            if(isset($request->id)){
                $q->where('id', '=', $request->id);
            }
        })->get();

        return response()->json($models, 200);
    }

}
