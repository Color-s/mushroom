import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)


app.use(router)
app.use(ElementPlus)

// const baseUrl = "http://mushroom-api.fenghua0918.top/";
const baseUrl = 'http://localhost:3000/'
app.config.globalProperties.$baseUrl = baseUrl

app.mount('#app')
