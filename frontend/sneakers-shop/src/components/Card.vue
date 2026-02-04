<script setup>
import {authToken, authUser} from "@/auth/auth.js";
import {computed} from "vue";

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  quantity: { type: Number, default: 0 } // новое
})
const isAuthenticated = computed(() => !!authUser.value)

// эмиты
const emit = defineEmits(['toggle-favorite', 'add-to-cart', 'remove-from-cart', 'change-quantity'])
</script>

<template>
  <div class="relative border border-slate-100 rounded-3xl p-8 transition hover:-translate-y-2 hover:shadow-2xl">
    <!-- Лайк -->
    <img v-if="authToken" @click.stop="emit('toggle-favorite')" class="absolute  cursor-pointer top-4 left-4 w-6 h-6"
         :src="isFavorite ? '/images/like-2.svg' : '/images/like-1.svg'" alt="like">

    <!-- Изображение -->
    <img :src="imageUrl" alt="кроссовки">

    <p class="mt-5">{{ title }}</p>

    <div class="flex justify-between mt-5 items-center">
      <div>
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} $</b>
      </div>

      <div v-if="authToken" class="flex items-center gap-2">
        <!-- Если добавлено в корзину показываем счетчик -->
        <template v-if="isAdded">
          <button @click.stop="emit('change-quantity', -1)" class="px-2  cursor-pointer py-1 bg-gray-200 rounded">-</button>
          <span>{{ quantity }}</span>
          <button @click.stop="emit('change-quantity', 1)" class="px-2  cursor-pointer py-1 bg-gray-200 rounded">+</button>
        </template>
        <!-- Если ещё не добавлено -->
        <img class="cursor-pointer" v-else @click.stop="emit('add-to-cart')" src="/images/plus.svg" alt="plus">
      </div>
    </div>
  </div>
</template>
