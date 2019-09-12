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
        })->paginate(10);

        return response()->json($posts, 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $post = Post::create([
            'title' => $request->title,
            'description' => $request->description,
            'body' => $request->body,
            'image' => $request->image,
        ]);
        $data = Post::where('id', $post->id)->get();

        return response()->json([
            'status' => (bool) $post ? 1 : 0,
            'data' => $data,
            'message' => $post ? 'Post Created!' : 'Error Creating Post'
        ]);
    }

}
