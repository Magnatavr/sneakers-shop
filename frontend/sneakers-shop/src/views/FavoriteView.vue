<script setup>
import { onMounted } from 'vue'
import CardList from "@/components/CardList.vue"
import Filter from "@/components/Filter.vue"
import Drawer from "@/components/Drawer.vue"
import { isCartOpen } from "@/cartDrawer/cartDrawer.js"
import {useProducts} from "@/assets/js/composables/useProducts.js";
import {useFavorites} from "@/assets/js/composables/useFavorites.js";


// Используем композабл
const {

  filters,
  handleToggleFavorite,
  handleAddToCart,
  handleChangeQuantity
} = useProducts()

const {
  favorites,
  isLoading,
  currentPage,
  lastPage,
  totalFavorites,
  init,
  loadFavorites,
} = useFavorites()

// Обработчик события из Drawer
const handleCartUpdated = async () => {
  // Перезагружаем товары после изменений в корзине
  await loadFavorites(currentPage.value)
}

// Инициализация
onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <Drawer v-if="isCartOpen"  @cart-updated="handleCartUpdated" />

    <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
      <div class="p-10">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-3xl font-bold">
            Все кроссовки
            <span v-if="favorites.length" class="text-gray-500 text-lg">
              ({{ favorites.length }})
            </span>
          </h2>

        </div>

        <CardList
            :sneakers="favorites"
            :loading="isLoading"
            @toggle-favorite="handleToggleFavorite"
            @add-to-cart="handleAddToCart"
            @change-quantity="(item, delta) => handleChangeQuantity(item, delta)"
        />

        <div class="flex justify-center gap-2 mt-8">
          <button
              :disabled="currentPage === 1"
              @click="loadFavorites(currentPage - 1)"
              class="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Назад
          </button>

          <span>Страница {{ currentPage }} из {{ lastPage }}</span>

          <button
              :disabled="currentPage === lastPage"
              @click="loadFavorites(currentPage + 1)"
              class="px-3 py-1 border rounded cursor-pointer hover:bg-gray-200 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  </div>
</template>