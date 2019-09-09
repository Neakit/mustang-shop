<?php

namespace App\Http\Controllers;

use App\ProductStatus;
use Illuminate\Http\Request;

class ProductStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $statuses = ProductStatus::all();
        return response()->json($statuses, 200);
    }

}
