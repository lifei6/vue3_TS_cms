import router from "@/router"
import { accountLogin } from "@/service/login/login"
import { localCache } from "@/utils/cache"
import { defineStore } from "pinia"

// 常量
import { LOGIN_TOKEN } from "@/global/constants"

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
    async accountLoginAction(account: any) {
      // 1.获取登录信息
      const loginRes = await accountLogin(account)
      const { id, token } = loginRes.data
      this.token = token

      // 2.保存在cache中
      localCache.setCache(LOGIN_TOKEN, token)

      // 3.获取用户信息
      // const userRes = await getUserById(id)
      // this.userInfo = userRes.data
      // localCache.setCache('useInfo', this.userInfo)

      // // 4.根据role的id获取菜单
      // const roleId = this.userInfo.role.id
      // const menuRes = await getRoleMenus(roleId)
      // this.userMenus = menuRes.data
      // localCache.setCache('userMenus', this.userMenus)

      // 跳转到首页
      router.push('/main')
    },
  },
})

export default useLoginStore
