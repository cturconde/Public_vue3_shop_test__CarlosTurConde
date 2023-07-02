import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
//Components
import elementPlus from 'element-plus'

import App from './App.vue'
import router from './router'

//CSS
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(createPinia()).use(router).use(elementPlus).mount('#app')
