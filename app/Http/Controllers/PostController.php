<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::where(function($q) use ($request) {
            if(isset($request->title)){
                $q->where('title', 'like', "%" . urldecode($request->title) . "%");
            }
            if(isset($request->body)){
                $q->where('title', 'like', "%" . urldecode($request->body) . "%");
            }
        })->paginate(10);

        return response()->json($posts, 200);
    }

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

    public function update(Request $request, Post $post)
    {
        $status = $post->update(
            $request->only([
                'image',
                'title',
                'description',
                'body'
            ])
        );

        $data = Post::where('id', $request->id)->first();

        return response()->json([
            'data' => $data,
            'status' => $status ? 1 : 0,
            'message' => $status ? 'Post Updated!' : 'Error Updating Post'
        ]);
    }

    public function destroy(Request $request, Post $post)
    {
        $deletedRows = Post::where('id', $request->id)->delete();

        return response()->json([
            'status' => $deletedRows,
            'message' => $deletedRows ? 'Post Deleted!' : 'Error Deleting Post'
        ]);
    }

}
