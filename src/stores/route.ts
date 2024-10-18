import { defineStore } from 'pinia'
import type { Menu } from '@/layout/sider/meun/types'
import routes from '@/router/routes'
import { type DefineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { iconComponent } from '@/utils/icon'

export const useRouteStore = defineStore('route', {
  state: () => ({
    routes: routes,
    menus: [] as Menu[],
    isMenusSet: false
  }),
  getters: {
    getMenus(): Menu[] {
      return this.menus
    }
  },
  actions: {
    setMenus() {
      if (this.isMenusSet) return

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
              icon: iconComponent(meta?.icon as DefineComponent | String),
              children: children ? processRoutes(children) : undefined,
              meta: meta as RouteMeta
            }
            return menu
          })
          .sort((a, b) => {
            return (a.meta.order as number) - (b.meta.order as number)
          })
      }

      this.menus = processRoutes(this.routes)
      this.isMenusSet = true
    }
  }
})
