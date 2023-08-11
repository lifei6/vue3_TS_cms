// 样式重置
import 'normalize.css'

// elemnet的message和loading等反馈框的样式需单独引入
import 'element-plus/theme-chalk/el-message.css'
// 也可以选择全局引入所有样式(这里不用)
// import 'element-plus/dist/index.css'

// 自己的全局样式
import '@/assets/css/index.less'

// 路由和pinia
import router from './router'
import store from './store'

// elemnet图标注册为全局组件
import icons from './global/register-icons'



import { createApp } from 'vue'
import App from './App.vue'
import useLoginStore from './store/login/login'

const app = createApp(App)
app.use(icons)
// store为添加动态路由后的pinia
app.use(store)
// 使用添加动态路由后的路由器
app.use(router)
app.mount('#app')
