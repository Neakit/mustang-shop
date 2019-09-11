<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::where(function($q) use ($request) {
            if(isset($request->title)){
                $q->where('title', 'like', "%{$request->title}%");
            }
            if(isset($request->id)){
                $q->where('id', '=', $request->id);
            }
        })->paginate(4);

        return response()->json($posts, 200);
    }
}
