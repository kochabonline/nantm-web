import { createRouter, createWebHistory } from 'vue-router'

import routes from './routes'
import { Access, DocumentTitle } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// 路由前置守卫
router.beforeEach(Access)
router.beforeEach(DocumentTitle)

export default router
