<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    // Фавориты
    Route::get('/favorites', [\App\Http\Controllers\FavoriteController::class, 'index']);
    Route::post('products/{product}/favorite', [\App\Http\Controllers\FavoriteController::class, 'toggle']);

    // Корзина
    Route::get('/cart', [\App\Http\Controllers\CartController::class, 'index']);
    Route::post('/cart/{product}', [CartController::class, 'add']);
    Route::delete('/cart/{product}', [CartController::class, 'remove']);
});

// Продукты
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']);
});


