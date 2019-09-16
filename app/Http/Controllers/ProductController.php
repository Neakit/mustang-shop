<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    
    public function index(Request $request)
    {
        $results = Product::with(['category', 'model', 'status'])
            ->where(function($q) use ($request){
                if(isset($request->title)){
                    $q->where('title', 'like', "%{$request->title}%");
                }
            })->whereHas('category', function($q) use ($request){
                 if(isset($request->category_id)){
                     $q->where('category_id', '=', $request->category_id);
                 }
            })->whereHas('model', function($q) use ($request){
                 if(isset($request->model_id)){
                     $q->where('product_model_id', '=', $request->product_model_id);
                 }
            })->paginate(9);

        return response()->json($results, 200);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {

        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'product_model_id' => $request->product_model_id,
            'price' => $request->price,
            'image' => $request->image,
            'category_id' => $request->category_id,
            'status_id' => $request->status_id
        ]);
        $data = Product::where('id', $product->id)->with(['category', 'model', 'status'])->first();

        return response()->json([
            'status' => (bool) $product ? 1 : 0,
            'data' => $data,
            'message' => $product ? 'Product Created!' : 'Error Creating Product'
        ]);
    }

    public function uploadFile(Request $request)
    {
        if($request->hasFile('image')){
            $name = time()."_".$request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('images'), $name);
        }
        return response()->json(asset("images/$name"),201);
    }

    public function show(Product $product)
    {
        return response()->json($product,200);
    }

    public function edit(Product $product)
    {
        //
    }

    public function update(Request $request, Product $product)
    {
        $status = $product->update(
            $request->only([
                'image',
                'title',
                'product_model_id',
                'category_id',
                'status_id',
                'price',
                'description'
            ])
        );

        $data = Product::where('id', $request->id)->with(['category', 'model', 'status'])->first();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Product Updated!' : 'Error Updating Product'
        ]);
    }

    public function updateUnits(Request $request, Product $product)
    {
        $product->units = $product->units + $request->get('units');
        $status = $product->save();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Units Added!' : 'Error Adding Product Units'
        ]);
    }

    public function destroy(Product $product)
    {
        $status = $product->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Product Deleted!' : 'Error Deleting Product'
        ]);
    }

}
