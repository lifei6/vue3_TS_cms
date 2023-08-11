import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { firstRoute, mapMenuToRoutes } from '@/utils/map-menu'

// 采用这个工具快速生成组件文件和对应路由文件
// 命令行模式
// coderwhy add3page_setup department -d src/views/main/system/department
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'main',//加名字才能添加路由，用名字添加的，不然路由出口不对
      component: () => import('@/views/main/main.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/NotFound.vue')
    },
  ]
})


// 动态添加路由函数
export function addRoutesWithMenu(menus: any) {
  // 1.获取菜单匹配到的所有路由
  const routes = mapMenuToRoutes(menus)

  // 2.添加到路由器
  routes.forEach((route) => {
    router.addRoute('main', route)
  })
  // console.log('添加动态路由后结果：', router.getRoutes())
}


// 未登入不能进主页，登入后能通过url进主页
router.beforeEach((to, from) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    // 1.未登入不能去主页,去登入
    return '/login'
  }
  if (to.path === '/login' && token) {
    // 2.登入了直接去主页
    return firstRoute?.path
  }
  if (to.path === '/main') {
    // 3.进入主页的默认url
    return firstRoute?.path
  }
})

export default router
