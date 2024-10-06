import { defineStore } from 'pinia'
import type { Menu } from '@/layout/sider/meun/types'
import routes from '@/router/routes'
import { h, type DefineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export const useRouteStore = defineStore('route', {
  state: () => ({
    routes: routes,
    menuRouter: [] as Menu[],
    isMenuRouterSet: false
  }),
  getters: {
    getMenuRouter(): Menu[] {
      return this.menuRouter
    }
  },
  actions: {
    setMenuRouter() {
      if (this.isMenuRouterSet) return

      const processRoutes = (routes: RouteRecordRaw[]): Menu[] => {
        return routes
          .filter((route) => !route.meta?.hideInMenu)
          .map((route) => {
            const { name, meta, children } = route
            const title = (meta?.title as string) || ''
            const menu: Menu = {
              key: name as string,
              title: title,
              label: title,
              icon: () => h((meta?.icon as DefineComponent) || 'span'),
              children: children ? processRoutes(children) : undefined,
              meta: meta as RouteMeta
            }
            return menu
          })
          .sort((a, b) => {
            return (a.meta.order as number) - (b.meta.order as number)
          })
      }

      this.menuRouter = processRoutes(this.routes)
      this.isMenuRouterSet = true
    }
  }
})
