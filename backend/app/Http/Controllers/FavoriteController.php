<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{

    // Получить все фавориты текущего пользователя
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();
        $perPage = $request->query('perPage', 10);

        $favorites = $user->favorites()
            ->paginate($perPage);

        return response()->json($favorites);
    }

    public function toggle(Product $product): \Illuminate\Http\JsonResponse
    {
        $user = auth()->user();

        $exists = $user->favorites()
            ->where('product_id', $product->id)
            ->exists();

        if ($exists) {
            $user->favorites()->detach($product->id);
            $isFavorite = false;
        } else {
            $user->favorites()->attach($product->id);
            $isFavorite = true;
        }

        return response()->json([
            'is_favorite' => $isFavorite
        ]);
    }
}
