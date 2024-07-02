import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/static/vFun.js'
import ElementPlus from 'element-plus'
import './assets/static/global.css'
import 'element-plus/dist/index.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VirtualScroller from 'vue-virtual-scroller'

const app = createApp(App)

app.use(ElementPlus)
app.use(VirtualScroller)
app.mount('#app')
