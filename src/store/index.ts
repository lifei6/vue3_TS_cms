import { createPinia } from "pinia";
import type { App } from 'vue';
import useLoginStore from "./login/login";

const pinia = createPinia()

function loadingLocalCache(app: App<Element>) {
  app.use(pinia)
  // pinia重新加载，读取本地缓存执行
  const loginStore = useLoginStore()
  loginStore.loadLocalDataAction()
}

export default loadingLocalCache
