import router, { addRoutesWithMenu } from "@/router"
import { accountLogin, getRoleMenus, getUserById } from "@/service/login/login"
import { localCache } from "@/utils/cache"
import { defineStore } from "pinia"

// 常量
import { LOGIN_TOKEN } from "@/global/constants"
import useMainStore from "../main/main"

// 类型或接口
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any[]
}


// 登入仓库
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    // 首次登入执行
    async accountLoginAction(account: any) {
      // 1.获取登录信息：获取id和token
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      // 2.保存在cache中
      localCache.setCache(LOGIN_TOKEN, token)

      // 3.获取用户信息:根据id获取并本地存储
      const userRes = await getUserById(id)
      this.userInfo = userRes.data
      localCache.setCache('useInfo', userRes.data)

      // 用户信息里面有对应的角色信息role
      // 4.根据role的id获取菜单:根据id获取并本地存储
      const roleId = this.userInfo.role.id
      const menuRes = await getRoleMenus(roleId)
      this.userMenus = menuRes.data
      localCache.setCache('userMenus', menuRes.data)

      // 5.获取所有的主页所备用的数据：菜单、部门、角色
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 5.根据菜单动态添加路由
      addRoutesWithMenu(this.userMenus)

      // 6.跳转到首页
      router.push('/main')
    },
    // 页面刷新重新运行app，加载本地缓存执行，读取缓存后进行动态路由添加
    loadLocalDataAction() {
      this.token = localCache.getCache(LOGIN_TOKEN)
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
      //加载缓存菜单后进行动态路由添加
      addRoutesWithMenu(this.userMenus)
      // 再次请求备选数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  },
})

export default useLoginStore
