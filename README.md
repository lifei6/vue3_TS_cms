# X后台管理系统

## 页面

- 系统总览analysis
  - 
- 系统管理system
  - 用户管理user
    - 过滤表单
    - 展示列表
    - 分页器
  - 部门管理department
  - 菜单管理menu
  - 角色管理role
- 商品中心product
  - 商品类别category
  - 商品信息goods
- 随便聊聊story
- 

## 功能实现

> ### 注意！！！
>
> - pinia和router刷新页面会重新初始化
> - 针对pinia我们需要进行本地存储，每次刷新可以去获取本地存储的数据
> - 针对router我们添加的动态路由一刷新就没有了（因为动态添加路由是在登入时做的，我们进来了就不会再派发登入请求的行动），我们需要更具菜单栏读取本地数据后===>自己在添加一次（页面刷新重新执行main.ts）

### 一、登入功能

- 1.前端的表单校验

- 2.发起登入请求

  - 获取token和用户id

  - 本地存储token（先存储，因为后面的请求要用token）

  - 根据id获取用户详细信息uerInfo

  - 根据userInfo里面用户对应的角色role获取菜单树userMenu

  - 本地存储userInfo、userMenu

    > 注意：所有请求都要在携带token，在请求头中的Authorization设置，请求头在请求拦截器中设置

- 3.根据菜单进行动态路由添加

- 4.进行页面跳转到主页

- 5.需要路由守卫进行跳转限制，有token则进入main,没有就进入login

- 6.记住密码的功能，就是进行本地存储用户名和密码

### 二、权限管理

- 页面跳转权限

  > 使用全局前置守卫实现

  1. 没有token跳转login
  2. 有token想进login直接跳main

- 菜单栏权限

  > 通过后端的RBAC（基于角色的访问控制），返回用户所属的role，从而在后端返回对应的菜单列表
  >
  > 然后路由的注册需要使用动态路由

  1. 判断用户的所属角色
  2. 获取角色所具有的菜单栏（注意：手动输入路径还是能跳对应的页面，需要采用动态注册路由）

- 按钮权限

###  三、动态路由

- 静态路由（前端一次性注册所有路由）的缺陷

  1. 路由是在前端全部注册了的（一些用户没有对应的菜单选项，也就不能通过菜单点击跳转）
  2. 但是可以手动输入路径进行跳转，会进入到对应的页面中（组件），我们是不希望这样的
  3. 如果后端验证了我们这样也访问不到数据，但是不能依靠后端去做这事，他做不做是他的事

- 动态路由（根据菜单（或用户角色）去动态注册路由）（addRoute去动态添加，removeRoute去删除）

- ![image-20230811153524008](C:\Users\hasee\AppData\Roaming\Typora\typora-user-images\image-20230811153524008.png)

  返回菜单列表每个对象结构：

  ```json
          {
              "id": 61,
              "name": "系统总览",
              "type": 1,//几级路由
              "url": "/main/analysis",//路由的地址
              "icon": "el-icon-monitor",//菜单图标
              "sort": 1,
              "createAt": "2023-02-09T06:55:44.000Z",
              "updateAt": "2023-02-09T07:45:18.000Z",
              "children": [//子路由
                  {
                      "id": 62,
                      "url": "/main/analysis/dashboard",
                      "icon": null,
                      "name": "分析表",
                      "sort": 102,
                      "type": 2,
                      "children": null,
                      "createAt": "2023-02-09 14:59:00.000000",
                      "updateAt": "2023-02-09 15:47:08.000000"
                  },
              ]
          },
  ```

  

  1. 基于角色的动态路由管理

     

  2. 基于菜单的动态路由管理（推荐）

     根据菜单动态添加路由对象（路由对象是放在独立的文件中的）

     ：coderwhy add3page_setup department -d src/views/main/system/department 可以快速生成组件和路由对象

     1. 获取菜单userMenus==>代码写的位置

     2. 动态获取所有的路由对象，放到数组中

        - 路由对象都在独立的文件中暴露了

        - 从文件中将所有路由对象先读取到数组

          ：使用vite动态导入语法import.meta.glob('../router/main/**/*.ts', { eager: true })

          获得一个{文件名：函数} 的对象

     3. 根据菜单取匹配正确的路由

        - router.addRoute('main',xxx)
        - 需要递归的去匹配子路由，直到匹配所有的菜单项所对应的子路由

### 四、具体页面（增删改查）



## 处理服务器数据

> 后端如果给的不是想要格式的数据，我们拿到数据进行一个映射，映射为我们想要的数据结构