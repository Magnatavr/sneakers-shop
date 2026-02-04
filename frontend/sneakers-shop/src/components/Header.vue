<script setup>
import {computed, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import {authUser, initAuth, logout} from '@/auth/auth.js'
import {openCart} from "@/cartDrawer/cartDrawer.js";
import {cartCount, cartTotal} from "@/cartDrawer/cartStore.js";
import {useFavorites} from "@/assets/js/composables/useFavorites.js";
import {setFavoritesUpdateCallback} from "@/assets/js/utils/favoritesUpdater.js";

const router = useRouter()
const {
  totalFavorites,
  init
} = useFavorites()
setFavoritesUpdateCallback(init)
const favoritesCount = totalFavorites

const isAuthenticated = computed(() => !!authUser.value)
const userName = computed(() => {
  if (!authUser.value) return ''
  return authUser.value.name || authUser.value.email.split('@')[0]
})

const goToLogin = () => router.push('/login')
const goToRegister = () => router.push('/register')
const handleLogout = () => {
  logout()
  router.push('/login')
}

onMounted(() => {
  initAuth()
  if (isAuthenticated.value) {
    init()
  }})
</script>


<template>
  <header class=" bg-white border-b border-slate-200 px-8 py-4">
    <div class="flex items-center justify-between">
      <!-- Логотип -->
      <router-link to="/" class="flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" class="w-10" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500 text-sm">shop best sneakers</p>
        </div>
      </router-link>

      <!-- Навигация -->
      <nav class="flex items-center gap-10">
        <!-- Корзина -->
        <button v-if="isAuthenticated" @click.prevent="openCart" class="flex cursor-pointer items-center gap-3 text-slate-600 hover:text-black">
          <div class="relative">
            <img src="/images/cart.svg" alt="Cart" class="w-6">
            <span v-if="cartCount" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ cartCount }}
            </span>
          </div>
          <b>{{ cartTotal }} $</b>
        </button>

        <!-- Закладки -->
        <router-link v-if="isAuthenticated" to="/favorites" class="flex items-center gap-3 text-slate-600 hover:text-black">
          <div class="relative">
            <img  src="/images/heart.svg" alt="heart" class="w-6">
            <span v-if="favoritesCount" class="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {{ favoritesCount }}
            </span>
          </div>
          <b>закладки</b>
        </router-link>

        <!-- Профиль / Авторизация -->
        <div class="flex items-center gap-6">
          <div v-if="isAuthenticated" class="flex items-center gap-4">
            <!-- Имя пользователя -->
            <span class="font-medium text-slate-700">{{ userName }}</span>

            <!-- Кнопка выхода -->
            <button
                @click="handleLogout"
                class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
            >
              Выйти
            </button>
          </div>

          <div v-else class="flex items-center gap-4">
            <!-- Кнопка входа -->
            <button
                @click="goToLogin"
                class="px-4 py-2  text-slate-700 hover:text-black transition cursor-pointer"
            >
              Войти
            </button>

            <!-- Кнопка регистрации -->
            <button
                @click="goToRegister"
                class="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition cursor-pointer"
            >
              Регистрация
            </button>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>