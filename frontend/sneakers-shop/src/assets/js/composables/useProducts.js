import { ref, watch } from 'vue'

import { fetchCart } from '@/cartDrawer/cartStore'
import {loadSneakers, productState} from "@/assets/js/utils/productLoader.js";
import {toggleFavorite} from "@/assets/js/stores/favoriteStore.js";
import {addToCart, changeQuantity} from "@/assets/js/stores/cartOperations.js";

export function useProducts() {
    const sneakers = ref(productState.sneakers)
    const isLoading = ref(productState.isLoading)
    const currentPage = ref(productState.currentPage)
    const lastPage = ref(productState.lastPage)

    const filters = ref({
        searchQuery: '',
        sortBy: 'title',
        minPrice: null,
        maxPrice: null
    })

    // Инициализация
    const init = async () => {
        await loadProducts()
        await fetchCart()
    }

    // Загрузка товаров
    const loadProducts = async (page = 1) => {
        const result = await loadSneakers(filters.value, page)
        sneakers.value = result.sneakers
        currentPage.value = result.currentPage
        lastPage.value = result.lastPage
    }

    // Отслеживание фильтров
    watch(filters, () => {
        loadProducts(1)
    }, { deep: true })

    // Обновление фильтров
    const updateFilters = (newFilters) => {
        filters.value = { ...filters.value, ...newFilters }
    }

    // Обработчики
    const handleToggleFavorite = async (item) => {
        await toggleFavorite(item)
    }

    const handleAddToCart = async (item) => {
        await addToCart(item)
    }

    const handleChangeQuantity = async (item, delta) => {
        await changeQuantity(item, delta)
    }

    return {
        sneakers,
        isLoading,
        currentPage,
        lastPage,
        filters,
        init,
        loadProducts,
        updateFilters,
        handleToggleFavorite,
        handleAddToCart,
        handleChangeQuantity
    }
}