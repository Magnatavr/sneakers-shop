import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/main.css'

axios.defaults.baseURL = 'http://127.0.0.1:8000/api'

const token = localStorage.getItem('token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

createApp(App)
    .use(router)
    .mount('#app')
