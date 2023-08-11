import hyRequest from '..'


// 请求登入
export function accountLogin(account: any) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 获取用户信息
export function getUserById(id: number) {
  return hyRequest.get({
    url: '/users/' + id
    // 这里可以携带token也可以用请求拦截器加：因为后台数据基本都要token因此后面的方式更好
  })
}

// 获取角色菜单
export function getRoleMenus(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
