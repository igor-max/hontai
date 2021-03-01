
import store from '@/store/index';
import router from '@/router';
import { getToken } from '@/utils/auth.js';
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const Whitelists = ['/login'];

router.beforeEach(async (to, from, next) => {

  // start progress bar
  NProgress.start()

  const token = getToken();

  if (token) {
    if (to.path === '/login') {
      next({ path: '/' });
      // NProgress.done();
    } else {
      const hasRoles = store.state.user.roles && store.state.user.roles.length;
      if (hasRoles) {
        next();
      } else {
        try {
          // 获取用户权限
          const roles = await store.dispatch('user/getInfo', { token });
          // 根据用户权限获取对应路由
          const routes = await store.dispatch('permission/generateRoutes', roles);
          // 添加路由
          router.addRoutes(routes);
          next({ ...to, replace: true }); // 当从login跳转到首页，不希望登入后浏览器有历史纪录，防止可以按浏览器的返回键跳转到login，又跳转到首页
        } catch (err) {
          // 删除token，重新登入
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (Whitelists.includes(to.path)) {
      next();
    } else {
      next({ path: `/login?redirect=${to.path}` });
      NProgress.done()
    }
  }
});


router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})