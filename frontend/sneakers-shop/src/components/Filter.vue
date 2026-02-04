<script setup>
import { ref } from 'vue';

// Все настройки фильтра в одном месте
const sortBy = ref('title');
const minPrice = ref('');
const maxPrice = ref('');
const searchQuery = ref('');

// Говорим родителю о изменениях
const emit = defineEmits(['update-filters']);

const applyFilters = () => {
  emit('update-filters', {
    sortBy: sortBy.value,
    searchQuery: searchQuery.value, // <-- отправляем поисковый запрос
    minPrice: minPrice.value ? Number(minPrice.value) : null,
    maxPrice: maxPrice.value ? Number(maxPrice.value) : null
  });
};

// Сбросить все фильтры
const resetFilters = () => {
  // 1. Сбрасываем все значения к начальным
  sortBy.value = 'title';
  minPrice.value = '';
  maxPrice.value = '';
  searchQuery.value = '';

  // 2. Отправляем сброшенные значения родителю
  emit('update-filters', {
    sortBy: 'title',
    searchQuery: '',
    minPrice: null,
    maxPrice: null
  });


};


let timeoutId = null;
const handleSearchInput = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    applyFilters();
  }, 300); // Ждем 300мс после последнего ввода
};
</script>

<template>
  <div class="flex flex-wrap items-center justify-around w-1/2">
    <!-- ПОИСК -->
    <div class="relative">
      <input
          v-model="searchQuery"
          @input="handleSearchInput"
          type="text"
          placeholder="Поиск кроссовок..."
          class="border rounded-lg px-4 py-2 pl-10 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <!-- Иконка лупы -->
      <svg
          class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>

    <!-- Выбор сортировки -->
    <select
        v-model="sortBy"
        @change="applyFilters"
        class="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="title">По названию</option>
      <option value="price_asc">Дешевые вперед</option>
      <option value="price_desc">Дорогие вперед</option>
    </select>

    <!-- Фильтр по цене -->
    <div class="flex items-center gap-2">
      <input
          v-model="minPrice"
          @input="applyFilters"
          type="number"
          placeholder="От"
          class="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span class="text-gray-500">-</span>
      <input
          v-model="maxPrice"
          @input="applyFilters"
          type="number"
          placeholder="До"
          class="w-24 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>


    <button
        @click="resetFilters"
        class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border rounded-lg hover:bg-gray-50 cursor-pointer"
    >
      Сбросить
    </button>
  </div>
</template>