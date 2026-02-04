import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export function useFavorites() {
    const router = useRouter()

    // Состояние
    const favorites = ref([])
    const isLoading = ref(false)
    const currentPage = ref(1)
    const lastPage = ref(1)
    const totalFavorites = ref(0)

    // Проверка авторизации
    const isAuthenticated = computed(() => {
        return !!localStorage.getItem('token')
    })

    // Загрузка избранного
    const loadFavorites = async (page = 1) => {

        if (!isAuthenticated.value) {
            router.push('/login')
            return
        }

        isLoading.value = true

        try {
            const response = await axios.get('/favorites', {
                params: { page },
            })
            console.log(response.data.total)

            favorites.value = response.data.data.map(item => ({
                id: item.id,
                title: item.title,
                price: Number(item.price),
                image_url: item.image_url,
                is_favorite: true,
                is_added: Boolean(item.is_added),
                quantity: item.quantity,
            }))

            currentPage.value = response.data.current_page
            lastPage.value = response.data.last_page
            totalFavorites.value = response.data.total
            console.log(totalFavorites.value)

        } catch (error) {
            console.error('Ошибка загрузки избранного:', error)
            if (error.response?.status === 401) {
                router.push('/login')
            }
        } finally {
            isLoading.value = false
        }
    }

    // Инициализация
    const init = async () => {
        await loadFavorites()
    }



    return {
        favorites,
        isLoading,
        currentPage,
        lastPage,
        totalFavorites,
        init,
        loadFavorites,
    }
}