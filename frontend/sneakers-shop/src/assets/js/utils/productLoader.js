import axios from 'axios'

// Состояние
export const productState = {
    sneakers: [],
    isLoading: false,
    currentPage: 1,
    lastPage: 1
}

// Функция загрузки товаров
export async function loadSneakers(filters = {}, page = 1) {
    productState.isLoading = true

    try {
        const token = localStorage.getItem('token')
        const headers = {}

        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await axios.get('/products', {
            params: {
                search: filters.searchQuery || '',
                sort: filters.sortBy || 'title',
                min_price: filters.minPrice || null,
                max_price: filters.maxPrice || null,
                page: page
            },
            headers: headers
        })

        productState.sneakers = response.data.data.map(item => ({
            id: item.id,
            title: item.title,
            price: Number(item.price),
            image_url: item.image_url,
            is_favorite: Boolean(item.is_favorite),
            is_added: Boolean(item.is_added),
            quantity: item.quantity || 0
        }))

        productState.currentPage = response.data.current_page
        productState.lastPage = response.data.last_page

        return productState
    } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
        throw error
    } finally {
        productState.isLoading = false
    }
}