<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    // Получить все товары в корзине текущего пользователя
    public function index(Request $request): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();
        $cartItems = $user->cartItems()->withPivot('quantity')->get();

        return response()->json($cartItems);
    }
    public function add(Request $request, Product $product): \Illuminate\Http\JsonResponse
    {
        $user = $request->user();

        // Получаем текущий товар из корзины
        $item = $user->cartItems()->where('product_id', $product->id)->first();

        // Если пришла quantity (например, при +/–), обновляем его
        $newQuantity = $request->input('quantity'); // необязательно

        if ($item) {
            if ($newQuantity !== null) {
                // Устанавливаем новое количество
                $user->cartItems()->updateExistingPivot($product->id, ['quantity' => $newQuantity]);
            } else {
                // Просто прибавляем 1
                $user->cartItems()->updateExistingPivot($product->id, ['quantity' => $item->pivot->quantity + 1]);
            }
        } else {
            // Если нет в корзине — добавляем
            $user->cartItems()->attach($product->id, ['quantity' => $newQuantity ?? 1]);
        }

        return response()->json(['success' => true]);
    }

    public function remove(Product $product): \Illuminate\Http\JsonResponse
    {
        $user = auth()->user();

        $user->cartItems()->detach($product->id);

        return response()->json(['success' => true]);
    }
}
