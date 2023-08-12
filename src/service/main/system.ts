import hyRequest from '..'

/** 用户的网络请求 */
// 1.获取用户数据列表
export function getUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}


// 2.新增用户
export function newUserData(userInfo: any) {
  hyRequest.post({
    url: '/users',
    data: userInfo
  })
}

// 3.删除
export function deleteUserData(id: number) {
  return hyRequest.delete({
    url: '/users/' + id
  })
}

// 4.编辑
export function editUserData(id: number, userInfo: any) {
  return hyRequest.patch({
    url: '/users/' + id,
    data: userInfo
  })
}



/** 获取页面的数据 */
// 查
export function getPageListData(pageName: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
// 删
export function deletePageData(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}


// 增
export function newPageData(pageName: string, dataInfo: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: dataInfo
  })
}

// 改
export function editPageData(pageName: string, id: number, dataInfo: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: dataInfo
  })
}

/** 获取部门的信息 */
export function getDepartmentData(queryInfo: any) {
  return hyRequest.post({
    url: '/department/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any) {
  return hyRequest.post({
    url: '/role/list',
    data: queryInfo
  })
}

/** 获取菜单的信息 */
export function getMenuData() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
