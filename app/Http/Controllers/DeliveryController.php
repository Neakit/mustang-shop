<?php

namespace App\Http\Controllers;

use App\Delivery;
use Illuminate\Http\Request;

class DeliveryController extends Controller
{

    public function index(Request $request)
    {
        $delivery = Delivery::all();

        return response()->json($delivery, 200);
    }

    public function update(Request $request, Delivery $delivery)
    {
        $status = $delivery->update(
            $request->only([
                'body'
            ])
        );

        $data = Delivery::all();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Delivery Updated!' : 'Error Updating Delivery'
        ]);
    }
}
