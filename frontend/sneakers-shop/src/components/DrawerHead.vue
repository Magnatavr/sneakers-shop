<script setup>
import { useRouter } from 'vue-router'
import {closeCart} from "@/cartDrawer/cartDrawer.js";

const router = useRouter()


</script>

<template>
  <div class="flex items-center mb-6">
    <button
        @click="closeCart"
        class="mr-3 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition opacity-50 hover:opacity-100  hover:-translate-x-1"
        aria-label="Назад"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
      >
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>

</template>

<style scoped>

</style>