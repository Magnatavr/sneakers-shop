import { ref } from 'vue'
import axios from 'axios'

// Реактивное состояние
export const authUser = ref(null)
export const authToken = ref(null)



// Функция для установки пользователя после логина/регистрации
export function setAuthUser(user, token) {
    authUser.value = user
    authToken.value = token

    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    // Также обновляем axios defaults для будущих запросов
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// Функция логина
export async function login(credentials) {
    try {
        const response = await axios.post('/login', credentials)
        const { token, user } = response.data

        setAuthUser(user, token)
        return { success: true, user }
    } catch (error) {
        console.error('Ошибка входа:', error)

        if (error.response?.status === 422) {
            // Возвращаем ошибки валидации
            return {
                success: false,
                error: 'Ошибка валидации',
                errors: error.response.data.errors
            }
        } else if (error.response?.status === 401) {
            return {
                success: false,
                error: error.response.data?.message || 'Неверный email или пароль'
            }
        }

        return {
            success: false,
            error: 'Ошибка входа. Попробуйте еще раз.'
        }
    }
}

// Функция регистрации
export async function register(userData) {
    try {
        const response = await axios.post('/register', userData)
        const { token, user } = response.data

        setAuthUser(user, token)
        return { success: true, user }
    } catch (error) {
        console.error('Ошибка регистрации:', error)

        if (error.response?.status === 422) {
            // Возвращаем ошибки валидации
            return {
                success: false,
                error: 'Ошибка валидации',
                errors: error.response.data.errors
            }
        }

        return {
            success: false,
            error: 'Ошибка регистрации.'
        }
    }
}

// Функция выхода
export function logout() {
    authUser.value = null
    authToken.value = null

    localStorage.removeItem('user')
    localStorage.removeItem('token')

    // Удаляем заголовок Authorization из axios
    delete axios.defaults.headers.common['Authorization']
}

// Функция проверки авторизации
export function isAuthenticated() {
    return !!authToken.value
}

// Функция для получения заголовков авторизации
export function getAuthHeaders() {
    const token = authToken.value || localStorage.getItem('token')

    if (!token) return {}

    return {
        'Authorization': `Bearer ${token}`
    }
}

// Восстанавливаем состояние из localStorage при старте приложения
export function initAuth() {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
        authUser.value = JSON.parse(storedUser)
        authToken.value = storedToken

        // Устанавливаем заголовок для axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`


        // loadUserData()
    } else {
        // Убедимся, что состояние очищено
        authUser.value = null
        authToken.value = null
    }
}

// Инициализируем сразу
initAuth()