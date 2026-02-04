// stores/favoriteStore.js
import axios from 'axios'
import { updateFavorites } from "@/assets/js/utils/favoritesUpdater.js"

export async function toggleFavorite(product) {
    const oldValue = product.is_favorite
    product.is_favorite = !oldValue

    console.log('toggleFavorite вызван для товара:', product.id, 'новое значение:', product.is_favorite)

    try {
        await axios.post(`/products/${product.id}/favorite`, {
            is_favorite: product.is_favorite
        })

        console.log('Запрос на сервер успешен, обновляем счетчик...')

        // Вызываем функцию обновления
        await updateFavorites()

        console.log('Счетчик обновлен')

        return product.is_favorite
    } catch (error) {
        product.is_favorite = oldValue // Откатываем при ошибке
        console.error('Ошибка обновления избранного:', error)
        throw error
    }
}