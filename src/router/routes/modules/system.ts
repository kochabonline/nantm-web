import { ApiOutlined, LaptopOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layout/index.vue'),
    redirect: { name: 'Account' },
    meta: {
      title: '系统管理',
      icon: LaptopOutlined,
      order: 2
    },
    children: [
      {
        path: '/system/account',
        name: 'Account',
        component: () => import('@/views/system/account/index.vue'),
        meta: {
          title: '账户管理',
          icon: UserOutlined
        }
      },
      {
        path: '/system/role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'icon-role'
        }
      },
      {
        path: '/system/menu',
        name: 'AppMenu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: {
          title: '菜单管理',
          icon: MenuOutlined,
          keepAlive: true
        }
      },
      {
        path: '/system/api',
        name: 'Api',
        component: () => import('@/views/system/api/index.vue'),
        meta: {
          title: '接口管理',
          icon: ApiOutlined,
          keepAlive: true
        }
      }
    ]
  }
]

export default routes
