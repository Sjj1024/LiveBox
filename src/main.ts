import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/static/webmssdk.js'
import '@/assets/static/vFun.js'
import '@/assets/static/model.js'
import ElementPlus from 'element-plus'
import './assets/static/global.css'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
