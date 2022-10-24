import { createApp } from 'vue'
import App from './App.vue'
// 引入tailwindcss
import '@/assets/styles/tailwind.scss'
// 引入Element Plus
import ElementPlus from 'element-plus'
import  'element-plus/dist/index.css'
// 引入Element Plus Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入Vue Router
import router from './router';
// 引入pinia
import pinia from './store';

const app = createApp(App)

app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router)
app.use(pinia)
app.mount('#app')
