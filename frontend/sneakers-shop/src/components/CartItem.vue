<script setup>
defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  quantity: Number,
  imageClose: String
})

const emit = defineEmits(['remove'])
</script>

<template>
  <div class="flex items-center justify-around border border-slate-100 p-4 rounded-2xl">
    <img class="w-16 h-16" :src="imageUrl" alt="image">

    <div class="flex justify-between w-1/2 items-center flex-col gap-2">
      <p>{{ title }} (x{{ quantity }})</p>
      <div class="flex gap-10">
        <b>{{ price * quantity }} usdt</b>
        <img
            :src="imageClose"
            class="opacity-40 hover:opacity-100 cursor-pointer transition"
            alt="close"
            @click="emit('remove')"
        >
      </div>
    </div>
  </div>
</template>
