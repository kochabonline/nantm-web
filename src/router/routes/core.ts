import type { RouteRecordRaw } from 'vue-router'

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: { name: 'Login' },
    meta: {
      title: 'Root',
      hideInMenu: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'Login' },
    meta: {
      title: '认证',
      hideInMenu: true
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/authentication/login.vue'),
        meta: {
          title: '登录',
          hideInMenu: true
        }
      }
    ]
  }
]

const fallbackRoutes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/fallback/404/index.vue'),
    meta: {
      title: 'NotFound',
      hideInMenu: true
    }
  }
]

export { coreRoutes, fallbackRoutes }
