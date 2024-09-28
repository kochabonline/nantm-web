import type { RouteRecordRaw } from 'vue-router'

import { coreRoutes, fallbackRoutes } from './core'
import { mergeRouteModules } from '@/utils/mergeRouteModules'

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', { eager: true })
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles)

const routes: RouteRecordRaw[] = [...coreRoutes, ...fallbackRoutes, ...dynamicRoutes]

export default routes
