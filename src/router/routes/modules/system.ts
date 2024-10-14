import { LaptopOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layout/LayoutView.vue'),
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
        component: () => import('@/views/system/AccountView.vue'),
        meta: {
          title: '账户管理',
          icon: UserOutlined
        }
      },
      {
        path: '/system/role',
        name: 'Role',
        component: () => import('@/views/system/RoleView.vue'),
        meta: {
          title: '角色管理',
          icon: 'icon-role'
        }
      }
    ]
  }
]

export default routes
