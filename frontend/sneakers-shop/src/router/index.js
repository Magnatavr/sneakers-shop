import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
    ],
})

// 🔐 ЗАЩИТА РОУТОВ (ВОТ ТУТ!)
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (!token && to.name !== 'login' && to.name !== 'register') {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
