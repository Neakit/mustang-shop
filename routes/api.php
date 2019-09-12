<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'UserController@login');
Route::post('register', 'UserController@register');
Route::get('/products', 'ProductController@index');
Route::post('/product', 'ProductController@getProducts');

Route::get('/categories', 'CategoryController@index');
Route::get('/models', 'ProductModelController@index');
Route::get('/statuses', 'ProductStatusController@index');
Route::get('/posts', 'PostController@index');

Route::post('/upload-file', 'ProductController@uploadFile');
Route::get('/products/{product}', 'ProductController@show');
Route::post('/product', 'ProductController@filterProducts');

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('/users','UserController@index');
    Route::get('users/{user}','UserController@show');
    Route::patch('users/{user}','UserController@update');
    Route::get('users/{user}/orders','UserController@showOrders');

    Route::patch('products/{product}/units/add','ProductController@updateUnits');
    Route::patch('orders/{order}/deliver','OrderController@deliverOrder');
    Route::resource('/orders', 'OrderController');
    Route::resource('/products', 'ProductController')->except(['index','show']);
    Route::resource('/posts', 'PostController')->except(['index']);
    Route::resource('/categories', 'CategoryController')->except(['index','show']);
});
