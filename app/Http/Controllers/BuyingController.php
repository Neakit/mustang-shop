<?php

namespace App\Http\Controllers;

use App\Buying;
use Illuminate\Http\Request;

class BuyingController extends Controller
{

    public function index(Request $request)
    {
        $buying = Buying::all();

        return response()->json($buying, 200);
    }

    public function update(Request $request, Buying $buying)
    {
        $status = $buying->update(
            $request->only([
                'body'
            ])
        );

        $data = Buying::all();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Buying Updated!' : 'Error Updating Buying'
        ]);
    }
}
