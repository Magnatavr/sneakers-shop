<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/auth/auth.js'

const router = useRouter()
const isLoading = ref(false)
const errorMessage = ref('')
const validationErrors = ref({})

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const handleEnterKey = (event) => {
  if (event.key === 'Enter') {
    handleRegister()
  }
}

const handleRegister = async () => {
  errorMessage.value = ''
  validationErrors.value = {}
  isLoading.value = true

  try {
    const result = await register(form)

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
    errorMessage.value = 'Ошибка регистрации.'
    console.error('Register error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
      <!-- Заголовок -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Создать аккаунт</h1>
        <p class="text-gray-600">Присоединяйтесь к нашему сообществу</p>
      </div>

      <!-- Общая ошибка -->
      <div v-if="errorMessage"
           class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
        {{ errorMessage }}
      </div>

      <!-- Форма -->
      <div class="space-y-6">
        <!-- Имя -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Имя
          </label>
          <input
              v-model="form.name"
              @keyup="handleEnterKey"
              type="text"
              placeholder="Ваше имя"
              :class="[
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200',
              validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
            ]"
          />
          <p v-if="validationErrors.name" class="mt-2 text-sm text-red-600">
            {{ validationErrors.name }}
          </p>
        </div>

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
              :class="[
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200',
              validationErrors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
            ]"
          />
          <p v-if="validationErrors.email" class="mt-2 text-sm text-red-600">
            {{ validationErrors.email }}
          </p>
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
              placeholder="Минимум 6 символов"
              :class="[
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200',
              validationErrors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
            ]"
          />
          <p v-if="validationErrors.password" class="mt-2 text-sm text-red-600">
            {{ validationErrors.password }}
          </p>
        </div>

        <!-- Подтверждение пароля -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Подтверждение пароля
          </label>
          <input
              v-model="form.password_confirmation"
              @keyup="handleEnterKey"
              type="password"
              placeholder="Повторите пароль"
              :class="[
              'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition duration-200',
              validationErrors.password_confirmation ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-gray-50'
            ]"
          />
          <p v-if="validationErrors.password_confirmation" class="mt-2 text-sm text-red-600">
            {{ validationErrors.password_confirmation }}
          </p>
        </div>

        <!-- Кнопка регистрации -->
        <button
            @click="handleRegister"
            :disabled="isLoading"
            class=" cursor-pointer w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-4 rounded-lg font-medium hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-md hover:shadow-lg"
        >
          <span v-if="isLoading">
            <svg class="animate-spin h-5 w-5 text-white inline-block mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Регистрация...
          </span>
          <span v-else>Зарегистрироваться</span>
        </button>

        <!-- Ссылка на логин -->
        <div class="text-center pt-4 border-t border-gray-200">
          <p class="text-gray-600">
            Уже есть аккаунт?
            <router-link
                to="/login"
                class="text-emerald-600 cursor-pointer font-medium hover:text-emerald-800 transition ml-1"
            >
              Войти
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>