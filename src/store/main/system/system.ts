import {
  deletePageData,
  deleteUserData,
  editPageData,
  editUserData,
  getPageListData,
  getUserListData,
  newPageData,
  newUserData
} from '@/service/main/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 没有封装的用户列表的请求（常规写法）
    async getUserListDataAction(queryInfo: any) {
      // 1.请求用户列表数据
      const userListResult = await getUserListData(queryInfo)
      const { list, totalCount } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async newUserDataAction(userInfo: any) {
      console.log('userInfo', userInfo)
      // 1.创建用户数据
      const res = await newUserData(userInfo)
      console.log(res) //为啥成功返回undefined给个成功的code啊啊啊

      // 2.请求新的数据
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    async deleteUserDataAction(id: number) {
      const res = await deleteUserData(id)
      console.log(res)
      this.getUserListDataAction({ offset: 0, size: 10 })
    },
    // 根据id编辑用户数据
    async editUserDataAction(id: number, userInfo: any) {
      const res = await editUserData(id, userInfo)
      console.log(res)
      this.getUserListDataAction({ offset: 0, size: 10 })
    },

    // 页面的网络请求（通用抽取写法）
    async getPageListDataAction(pageName: string, queryInfo: any) {
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, totalCount } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataAction(pageName: string, id: number) {
      const res = await deletePageData(pageName, id)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async newPageDataAction(pageName: string, pageData: any) {
      const res = await newPageData(pageName, pageData)
      console.log(pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    },
    async editPageDataAction(pageName: string, id: number, pageData: any) {
      const res = await editPageData(pageName, id, pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
