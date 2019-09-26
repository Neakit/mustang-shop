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
                $q->where('title', 'like', "%" . urldecode($request->title) . "%");
            }
            if(isset($request->id)){
                $q->where('id', '=', $request->id);
            }
        })->get();

        return response()->json($models, 200);
    }

    public function update(Request $request, ProductModel $model)
    {
        $status = $model->update(
            $request->only([
                'title'
            ])
        );

        $data = ProductModel::where('id', $request->id)->first();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Product Model Updated!' : 'Error Updating Product Model'
        ]);
    }

    public function store(Request $request)
    {
        $model = ProductModel::create([
            'title' => $request->title
        ]);
        $data = ProductModel::where('id', $model->id)->first();

        return response()->json([
            'status' => (bool) $model ? 1 : 0,
            'data' => $data,
            'message' => $model ? 'Product Model Created!' : 'Error Creating Product Model'
        ]);
    }

    public function destroy(Request $request, ProductModel $model)
    {
        $deletedRows = ProductModel::where('id', $request->id)->delete();

        return response()->json([
            'status' => $deletedRows,
            'message' => $deletedRows ? 'Product Model Deleted!' : 'Error Deleting Product Model'
        ]);
    }

}
