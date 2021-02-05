import { createApp } from 'vue'
import App from './App'
import './registerServiceWorker'
import router from './router'

import '@/assets/css/tailwind.css'

createApp(App).use(router).mount('#app')
