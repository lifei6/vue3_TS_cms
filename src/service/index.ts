import { localCache } from '@/utils/cache'
import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 填加请求拦截器，在请求头携带token(每个请求都携带token)
    requestSuccessFn: (config) => {
      const token = localCache.getCache(LOGIN_TOKEN)
      // 有token且有请求头才添加
      if (config.headers && token) {
        config.headers.Authorization = "Bearer " + token
      }
      return config
    },
  }
})

export default hyRequest
