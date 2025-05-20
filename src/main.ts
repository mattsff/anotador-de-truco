import { createApp } from 'vue'
import './styles/style.css'
import './styles/tokens.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n'
import router from './router'

import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(i18n)
app.mount('#app')
