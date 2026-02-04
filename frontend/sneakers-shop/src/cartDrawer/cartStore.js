import { ref, computed } from 'vue'
import axios from 'axios'
import {loadSneakers} from "@/assets/js/utils/productLoader.js";


export const cartItems = ref([])
export const cartTotal = computed(() =>
    cartItems.value.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    )
)
export async function fetchCart() {
    try {
        const { data } = await axios.get('/cart')
        cartItems.value = data.map(item => ({
            ...item,
            quantity: item.pivot.quantity,
            productId: item.pivot.product_id
        }))
        return cartItems.value
    } catch (error) {
        console.error('Ошибка загрузки корзины:', error)
        return []
    }
}

export async function removeFromCart(productId) {
    try {
        await axios.delete(`/cart/${productId}`)
        await fetchCart()

        // Перезагружаем товары чтобы обновить статусы
        await loadSneakers({}, 1)

        return true
    } catch (error) {
        console.error('Ошибка удаления из корзины:', error)
        throw error
    }
}


export const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
)

export const totalPrice = computed(() =>
    cartItems.value.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    )
)

export const tax = computed(() =>
    Math.round(totalPrice.value * 0.05 * 100) / 100
)