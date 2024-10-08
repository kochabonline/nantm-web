import { LaptopOutlined, UserOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layout/LayoutView.vue'),
    redirect: { name: 'About' },
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
      }
    ]
  }
]

export default routes
