import type { RouteRecordRaw } from 'vue-router'

const coreRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: { name: 'Login' },
    meta: {
      title: 'Root',
      hidden: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    redirect: { name: 'Login' },
    meta: {
      title: '认证',
      hidden: true
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/authentication/login.vue'),
        meta: {
          title: '登录',
          hidden: true
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
      hidden: true
    }
  }
]

export { coreRoutes, fallbackRoutes }
