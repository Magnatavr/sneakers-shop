<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { initAuth } from '@/auth/auth.js'
import Header from './components/Header.vue'
import Footer from "@/components/Footer.vue";

onMounted(() => {
  initAuth()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white">
    <!-- Хедер -->
    <Header />

    <!-- Основное содержимое -->
    <main class="container mx-auto px-4 py-8">
      <RouterView v-slot="{ Component }">
        <transition
            name="page"
            mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>


    <Footer/>
  </div>
</template>

