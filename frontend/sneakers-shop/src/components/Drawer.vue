<script setup>
import DrawerHead from "@/components/DrawerHead.vue";
import CartItemList from "@/components/CartItemList.vue";
import { cartItems, fetchCart, totalPrice, tax, removeFromCart } from "@/cartDrawer/cartStore";
import {loadSneakers} from "@/assets/js/utils/productLoader.js";
import {onMounted} from "vue";


const emit = defineEmits(['cart-updated'])

onMounted(async () => {
  await fetchCart();
});

// Обработчик удаления с перезагрузкой товаров
const handleRemoveFromCart = async (productId) => {
  await removeFromCart(productId)

  emit('cart-updated')
}

// Функция закрытия корзины
const handleCloseDrawer = async () => {

  await loadSneakers({}, 1)
  emit('cart-updated')
}
</script>

<template>
  <div class="fixed top-0 right-0 h-full w-full bg-black z-10 opacity-70"></div>

  <div class="bg-white fixed top-0 right-0 z-20 h-full w-1/3 p-8 opacity-100">
    <DrawerHead @close="handleCloseDrawer"/>

    <!-- Передаём реальные данные в список -->
    <CartItemList :items="cartItems"  @remove="handleRemoveFromCart" />

    <div class="flex flex-col gap-7 mt-4">
      <div class="flex justify-around border border-slate-100 rounded-2xl">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} usdt</b>
      </div>

      <div class="flex justify-around border border-slate-100 rounded-2xl">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ tax }} usdt</b>
      </div>

      <button
          :disabled="!cartItems.length"
          class="bg-lime-500 mt-4 transition w-full disabled:bg-slate-400 rounded-2xl py-3 text-white hover:bg-lime-600 cursor-pointer active:bg-lime-700">
        Оформить заказ
      </button>
    </div>
  </div>
</template>
