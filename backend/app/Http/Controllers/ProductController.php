<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Auth::guard('sanctum')->user();
        $userId = $user ? $user->id : null;

        $query = Product::query();

        // Загружаем отношения
        $query->with([
            'favorites' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            },
            'cartItems' => function ($q) use ($userId) {
                $q->where('user_id', $userId);
            }
        ]);

        if ($request->filled('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        if ($request->filled('sort')) {
            if ($request->sort === 'price_asc') $query->orderBy('price');
            elseif ($request->sort === 'price_desc') $query->orderBy('price', 'desc');
            else $query->orderBy('title');
        }

        $products = $query->paginate(6);

        // Трансформируем коллекцию, чтобы фронт сразу получил нужные поля
        $products->getCollection()->transform(function ($product) use ($userId) {
            $cartItem = $product->cartItems->first(); // берем первый элемент cartItems для этого пользователя

            return [
                'id' => $product->id,
                'title' => $product->title,
                'price' => $product->price,
                'image_url' => $product->image_url,
                'is_favorite' => $product->favorites->isNotEmpty(),
                'is_added' => $cartItem ? true : false,
                'quantity' => $cartItem ? $cartItem->quantity : 0,
            ];
        });



        return response()->json($products);
    }


}
