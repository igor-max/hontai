import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/layout/index.vue';


// 路由重复报错问题start
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// end


export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',  // 这里的可能是tag那里重复定义了
  //     component: () => import('@/views/dashboard/index.vue'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }

];

export const asyncRoutes = [
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index.vue'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/aa',
    component: Layout,
    redirect: '/aa/table',
    name: 'Aa',
    meta: { title: 'Aa', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table2',
        component: () => import('@/views/table/index.vue'),
        meta: { title: 'aaaaaa', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree2',
        component: () => import('@/views/tree/index.vue'),
        meta: { title: 'bbb', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    meta: { title: 'Form', icon: 'form' },
    // 有一个children中时，必须写在father中，meta的roles必须写在father中，
    // 不要让 parent 显示，而 children roles不够
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index.vue'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new VueRouter({
  // mode: 'history', // require service support
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
