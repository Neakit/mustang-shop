<?php

namespace App\Http\Controllers;

use App\Guarantee;
use Illuminate\Http\Request;

class GuaranteeController extends Controller
{

    public function index(Request $request)
    {
        $guarantee = Guarantee::all();

        return response()->json($guarantee, 200);
    }

    public function update(Request $request, Guarantee $guarantee)
    {
        $status = $guarantee->update(
            $request->only([
                'body'
            ])
        );

        $data = Guarantee::all();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Guarantee Updated!' : 'Error Updating Guarantee'
        ]);
    }
}
