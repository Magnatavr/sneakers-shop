<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/api/posts', function () {
    return Post::all();
});
//Route::post('/api/login', [AuthController::class, 'login']);
//Route::post('/api/register', [AuthController::class, 'register']);
Route::get('/', function () {
    return view('welcome');
});
