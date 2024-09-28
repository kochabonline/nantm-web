import { DashboardOutlined, HomeOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layout/LayoutView.vue'),
    redirect: '/dashboard/analysis',
    meta: {
      title: '概览',
      icon: HomeOutlined,
      order: -1
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: {
          title: '仪表盘',
          icon: DashboardOutlined
        }
      }
    ]
  }
]

export default routes
