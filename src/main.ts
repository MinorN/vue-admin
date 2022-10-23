import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入tailwindcss
import '@/assets/styles/tailwind.scss'
// 引入Element Plus
import ElementPlus from 'element-plus'
import  'element-plus/dist/index.css'
// 引入Vue Router
import router from './router';

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
