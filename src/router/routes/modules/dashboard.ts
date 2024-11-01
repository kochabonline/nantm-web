import { DashboardOutlined, HomeOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/layout/index.vue'),
    redirect: { name: 'Analysis' },
    meta: {
      title: '概览',
      icon: HomeOutlined,
      order: -1
    },
    children: [
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis/index.vue'),
        meta: {
          title: '分析页',
          icon: DashboardOutlined,
          closable: false
        }
      }
    ]
  }
]

export default routes
