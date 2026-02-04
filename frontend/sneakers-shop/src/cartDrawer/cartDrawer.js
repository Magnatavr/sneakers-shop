import { ref } from 'vue'

export const isCartOpen = ref(false)

export const openCart = () => isCartOpen.value = true
export const closeCart = () => isCartOpen.value = false