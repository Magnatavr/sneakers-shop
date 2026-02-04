<script setup>
import Card from '@/components/Card.vue';

// Принимаем данные от homeView
const props = defineProps({
  sneakers: Array,    // список кроссовок для показа
  loading: Boolean    // идет загрузка?
});

// события наверх
const emit = defineEmits(['toggle-favorite', 'add-to-cart', 'remove-from-cart', 'change-quantity'])

</script>

<template>
  <!-- Показываем загрузку -->
  <div v-if="loading" class="text-center py-10">
    Загрузка кроссовок...
  </div>

  <!-- Показываем если нет товаров -->
  <div v-else-if="!sneakers.length" class="text-center py-10">
    Кроссовки не найдены 😢
  </div>

  <!-- Показываем сетку карточек -->
  <div v-else class="grid grid-cols-4 gap-5">
    <Card
        v-for="item in sneakers"
        :key="item.id"
        :image-url="item.image_url"
        :title="item.title"
        :price="Number(item.price)"
        :is-favorite="item.is_favorite"
        :is-added="item.is_added"
        :quantity="item.quantity || 0"
        @toggle-favorite="$emit('toggle-favorite', item)"
        @add-to-cart="$emit('add-to-cart', item)"
        @change-quantity="$emit('change-quantity', item, $event)"
    />

  </div>
</template>