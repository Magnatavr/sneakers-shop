<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/auth/auth.js'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const validationErrors = ref({})

const form = reactive({
  email: '',
  password: ''
})

const handleEnterKey = (event) => {
  if (event.key === 'Enter') {
    handleLogin()
  }
}

const handleLogin = async () => {
  errorMessage.value = ''
  validationErrors.value = {}
  isLoading.value = true

  try {
    const result = await login(form)

    if (result.success) {
      await router.push('/')
    } else {
      if (result.errors) {
        validationErrors.value = result.errors
        errorMessage.value = 'Пожалуйста, исправьте ошибки в форме.'
      } else {
        errorMessage.value = result.error
      }
    }
  } catch (error) {
    errorMessage.value = 'Ошибка входа. Проверьте данные.'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen  bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <!-- Заголовок -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Добро пожаловать</h1>
        <p class="text-gray-600">Войдите в свой аккаунт</p>
      </div>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage"
           class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
        {{ errorMessage }}
      </div>


      <div class="space-y-6">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
              v-model="form.email"
              @keyup="handleEnterKey"
              type="email"
              placeholder="your@email.com"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
        </div>

        <!-- Пароль -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Пароль
          </label>
          <input
              v-model="form.password"
              @keyup="handleEnterKey"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
          />
          <div class="text-right mt-2">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800 transition">Забыли пароль?</a>
          </div>
        </div>

        <!-- Кнопка входа -->
        <button
            @click="handleLogin"
            :disabled="isLoading"
            class="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md hover:shadow-lg"
        >
          <span v-if="isLoading">
            <svg class="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg"
                 fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Вход...
          </span>
          <span v-else>Войти</span>
        </button>

        <!-- Разделитель -->
        <div class="relative flex items-center justify-center my-6">
          <div class="flex-grow border-t border-gray-300"></div>
          <span class="flex-shrink mx-4 text-gray-500 text-sm">Или</span>
          <div class="flex-grow border-t border-gray-300"></div>
        </div>

        <!-- Ссылка на регистрацию -->
        <div class="text-center">
          <p class="text-gray-600">
            Нет аккаунта?
            <router-link
                to="/register"
                class="text-blue-600 font-medium hover:text-blue-800 transition ml-1"
            >
              Зарегистрироваться
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>