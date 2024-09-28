import { CompassOutlined, LaptopOutlined } from '@ant-design/icons-vue'
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
      order: 1
    },
    children: [
      {
        path: '/system/about',
        name: 'About',
        component: () => import('@/views/system/AboutView.vue'),
        meta: {
          title: '关于',
          icon: CompassOutlined
        }
      }
    ]
  }
]

export default routes
