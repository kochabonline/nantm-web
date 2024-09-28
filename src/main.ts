import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import pinia from './stores'

// 全局注册 ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
// 全局注册 iconfont 图标
import '@/assets/icon/iconfont.js'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Antd)

app.mount('#app')
