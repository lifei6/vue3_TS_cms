// 映射菜单和需要添加的路由

// 导入类型
import type { RouteRecordRaw } from "vue-router"

// 定义匹配到的第一个路由（默认展示）
export let firstRoute: RouteRecordRaw | undefined = undefined

// 获取所有本都路由
function loadLocalRoutes() {
  // 1.加载所有的模板(不加eager就是懒加载，不可行，我们是要立马遍历出改角色的所有路由进行动态添加)
  // {路径，模块：{default：我们的路由对象}}
  const modules: Record<string, any> = import.meta.glob('../router/main/**/*.ts', { eager: true })

  // 2.遍历所有的模板为路由对象
  const routes: RouteRecordRaw[] = []
  for (const key in modules) {
    const route = modules[key].default
    routes.push(route)
  }
  return routes
}

/**
 * 映射菜单到路由
 * @param menus 菜单
 * @returns 路由
 */
export function mapMenuToRoutes(menus: any[]) {
  // 1.加载所有的路由对象
  const localRoutes = loadLocalRoutes()
  // console.log('所有的路由对象', localRoutes)
  // 2.路由匹配
  // const finalRoutes: RouteRecordRaw[] = []
  // for (const menu of menus) {
  //   for (const submenu of menu.children) {
  //     const menuUrl = submenu.url
  //     const route = localRoutes.find((item) => item.path === menuUrl)
  //     if (route) {
  //       finalRoutes.push(route)
  //     }
  //   }
  // }

  // 3.不确定有几层；采用递归查找
  const finalRoutes: RouteRecordRaw[] = []
  function _recurseGetRoute(menus: any[]) {
    // type标识是1级还是2级路由
    for (const menu of menus) {
      if (menu.type === 2) {
        // 在所有路由中找到与当前的菜单url匹配的路由对象
        const route = localRoutes.find((item) => item.path === menu.url)
        if (route) finalRoutes.push(route)
        if (!firstRoute && route) firstRoute = route
      } else {
        // 如果一级路由且存在子路由，先添加自己（去掉children），在递归添加子路由
        // 自己要重定向到第一个字路由
        // ！！！ 只有叶子节点才是真正的组件对象，树根都是重定向到第一个叶子节点
        if (menu.type === 1 && menu.children.length) {
          finalRoutes.push({ path: menu.url, redirect: menu.children[0].url })
        }
        _recurseGetRoute(menu.children ?? [])
      }
    }
  }
  _recurseGetRoute(menus)
  // console.log('匹配到的路由对象', finalRoutes)

  return finalRoutes
}


// 路径==>头部面包屑
export function mapPathToBreadcrumbs(menus: any[], path: string) {
  const breadcrumbs: any[] = []
  // 1.两层遍历
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}

// 路径==>菜单
export function mapPathToMenu(menus: any[], path: string) {
  for (const menu of menus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) return submenu
    }
  }
}


