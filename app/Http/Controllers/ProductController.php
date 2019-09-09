<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $results = Product::with(['category', 'model', 'status'])
            ->where(function($q) use ($request){
                if(isset($request->title)){
                    $q->where('title', 'like', "%{$request->title}%");
                }
//                if(isset($request->title)){
//                    $q->where('title', 'like', "%{$request->title}%");
//                }

            })->whereHas('category', function($q) use ($request){
                /* if(isset($request->category_title)){
                     $q->where('title', 'like', "%{$request->category_title}%");
                 }*/
                 if(isset($request->category_id)){
                     $q->where('category_id', '=', $request->category_id);
                 }
            })->paginate(9);
//        $results->appends($search_params)->links();


        return response()->json($results, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'model' => $request->model_id,
            'price' => $request->price,
            'image' => $request->image,
            'category' => $request->category_id,
            'currency' => $request->currency_id,
            'status' => $request->status_id
        ]);

        return response()->json([
            'status' => (bool) $product,
            'data'   => $product,
            'message' => $product ? 'Product Created!' : 'Error Creating Product'
        ]);
    }

    public function getProducts(Request $request)
    {
        dd($request);
    }

    public function uploadFile(Request $request)
    {
        if($request->hasFile('image')){
            $name = time()."_".$request->file('image')->getClientOriginalName();
            $request->file('image')->move(public_path('images'), $name);
        }
        return response()->json(asset("images/$name"),201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    public function filterProducts(Request $request)
    {
        $product = $request->all();
        $productName = $product['query'];
        // dd($productName);

        //now get all user and services in one go without looping using eager loading
        //In your foreach() loop, if you have 1000 users you will make 1000 queries

        $products = Product::query()->where('name', 'like', '%shoe%')->get();

        return response()->json($products,200);

        // return view('browse.index', compact('users'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $status = $product->update(
            $request->only(['name', 'description', 'units', 'price', 'image'])
        );

        return response()->json([
            'status' => $status,
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
