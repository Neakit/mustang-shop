<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::where(function($q) use ($request) {
            if(isset($request->title)){
                $q->where('title', 'like', "%" . urldecode($request->title) . "%");
            }
            if(isset($request->description)){
                $q->where('title', 'like', "%" . urldecode($request->description) . "%");
            }
            if(isset($request->id)){
                $q->where('id', '=', $request->id);
            }
        })->get();

        return response()->json($categories, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = Category::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        $data = Category::where('id', $category->id)->first();
        
        return response()->json([
            'status' => (bool) $category ? 1 : 0,
            'data' => $data,
            'message' => $category ? 'Product Created!' : 'Error Creating Product'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $status = $category->update(
            $request->only([
                'title',
                'description'
            ])
        );

        $data = Category::where('id', $request->id)->first();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Category Updated!' : 'Error Updating Category'
        ]);
    }

    public function destroy(Request $request, Category $category)
    {
        $deletedRows = Category::where('id', $request->id)->delete();

        return response()->json([
            'status' => $deletedRows,
            'message' => $deletedRows ? 'Category Deleted!' : 'Error Deleting Category'
        ]);
    }
}
