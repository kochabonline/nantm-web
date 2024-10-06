import { IdcardOutlined, MessageOutlined, NotificationOutlined } from '@ant-design/icons-vue'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/message',
    name: 'Message',
    component: () => import('@/layout/LayoutView.vue'),
    redirect: { name: 'Control' },
    meta: {
      title: '消息管理',
      icon: MessageOutlined,
      order: 1
    },
    children: [
      {
        path: 'control',
        name: 'Control',
        component: () => import('@/views/message/ControlView.vue'),
        meta: {
          title: '控制台',
          icon: IdcardOutlined
        }
      },
      {
        path: 'channel',
        name: 'Channel',
        component: () => import('@/views/message/ChannelView.vue'),
        meta: {
          title: '通道',
          icon: NotificationOutlined
        }
      }
    ]
  }
]

export default routes
