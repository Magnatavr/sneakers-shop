<script setup>
import CartItem from "@/components/CartItem.vue";

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

defineEmits(['remove'])
</script>

<template>
  <CartItem
      v-for="item in items"
      :key="item.id"
      :image-url="item.image_url"
      :title="item.title"
      :price="Number(item.price)"
      :quantity="item.pivot.quantity"
      image-close="/images/close.svg"
      @remove="$emit('remove', item.id)"
  />
</template>
