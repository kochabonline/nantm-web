import { DashboardOutlined, DatabaseOutlined, LaptopOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/cmdb',
    name: 'Cmdb',
    component: () => import('@/layout/index.vue'),
    redirect: { name: 'Dashboard' },
    meta: {
      title: 'CMDB',
      icon: DatabaseOutlined,
      order: 1
    },
    children: [
      {
        path: 'dashboard',
        name: 'CmdbDashboard',
        component: () => import('@/views/cmdb/dashboard/index.vue'),
        meta: {
          title: '仪表盘',
          icon: DashboardOutlined
        }
      },
      {
        path: 'host',
        name: 'Host',
        component: () => import('@/views/cmdb/host/index.vue'),
        meta: {
          title: '主机',
          icon: LaptopOutlined
        }
      }
    ]
  }
]

export default routes
