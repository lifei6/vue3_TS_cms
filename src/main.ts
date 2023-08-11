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
import pinia from './store'

// elemnet图标注册为全局组件
import registerIcon from './global/register-icons'



import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(registerIcon)
app.use(router).use(pinia).mount('#app')
