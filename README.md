# 后台权限

后台：权限非常重要（不同的权限对应着不同的路由，同时侧边栏也需根据不同的权限，异步生成）

## 具体步骤

1. 登入

- 发送账号密码获取 token，保存在 cookie 中（刷新依旧在）
- 再根据 token 请求用户信息（用户权限，用户名等）

2. 权限验证

- 通过 token 获取用户对应的 role，动态根据用户的 role 算出其对应有权限的路由，通过 router.addRoutes 动态挂载这些路由。

数据和操作都是通过 vuex 全局管理控制的。刷新页面后 vuex 的内容也会丢失，所以需要重复上述的那些操作


