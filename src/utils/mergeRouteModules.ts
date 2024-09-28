import type { RouteRecordRaw } from 'vue-router'

/**
 * 合并动态路由模块
 * @param routeModules 导入的动态路由模块对象
 * @returns 合并后的动态路由数组
 */
function mergeRouteModules(routeModules: Record<string, unknown>): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  for (const key in routeModules) {
    const routeModule = routeModules[key]
    if (Array.isArray(routeModule)) {
      routes.push(...routeModule)
    } else {
      routes.push(...(routeModule as { default: RouteRecordRaw[] }).default)
    }
  }
  return routes
}

export { mergeRouteModules }
