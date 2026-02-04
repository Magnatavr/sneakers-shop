import axios from 'axios'
import { cartItems, fetchCart } from '@/cartDrawer/cartStore'

// Добавление в корзину
export async function addToCart(item) {
    try {
        await axios.post(`/cart/${item.id}`)
        await fetchCart()

        const cartItem = cartItems.value.find(i => i.productId === item.id)
        if (cartItem) {
            item.is_added = true
            item.quantity = cartItem.quantity
        }

        return cartItem
    } catch (error) {
        console.error('Ошибка добавления в корзину:', error)
        throw error
    }
}

// Изменение количества
export async function changeQuantity(item, delta) {
    const cartItem = cartItems.value.find(i => i.productId === item.id)
    if (!cartItem) return

    const newQuantity = cartItem.quantity + delta

    try {
        if (newQuantity <= 0) {
            // Удаляем из корзины
            await axios.delete(`/cart/${item.id}`)
            item.is_added = false
            item.quantity = 0
        } else {
            // Обновляем количество
            await axios.post(`/cart/${item.id}`, { quantity: newQuantity })
            item.quantity = newQuantity
        }

        await fetchCart()
        return { success: true, quantity: item.quantity }
    } catch (error) {
        console.error('Ошибка изменения количества:', error)
        throw error
    }
}