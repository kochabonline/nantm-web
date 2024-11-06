import { AddMenu, AddMenus, GetMenus } from '@/api/modules/menu'
import type { Menu, MenuRequest } from '@/types/menu'
import { defineStore } from 'pinia'
import { useRouteStore } from './route'
import { formatDate } from '@/utils/format'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    treeMenu: [] as Menu[]
  }),
  getters: {},
  actions: {
    async addMenu(data: MenuRequest) {
      try {
        const response = await AddMenu(data)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async addMenus() {
      try {
        const request = { menus: this.oneSync() }
        const response = await AddMenus(request)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getTreeMenu() {
      try {
        const response = await GetMenus()
        if (response.code != 200) {
          throw new Error(response.message)
        }
        this.treeMenu = response.data
        this.removeEmptyChildren(this.treeMenu)
        this.formatTreeMenu()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    formatTreeMenu() {
      this.treeMenu = this.treeMenu.map((item) => {
        if (item.children) {
          item.children = item.children.map((child) => {
            return {
              ...child,
              created_at: formatDate(child.created_at)
            }
          })
        }
        return {
          ...item,
          created_at: formatDate(item.created_at)
        }
      })
    },
    removeEmptyChildren(menu: Menu[]) {
      menu.forEach((item) => {
        if (item.children && item.children.length === 0) {
          delete item.children
        } else if (item.children) {
          this.removeEmptyChildren(item.children)
        }
      })
    },
    oneSync(): MenuRequest[] {
      const routeStore = useRouteStore()
      const flattenRoutes: MenuRequest[] = []

      // 递归函数，将树形结构转为列表结
      const flatten = (routes: any[], parentName = '') => {
        routes.forEach((route) => {
          if (!route.meta?.hidden) {
            flattenRoutes.push({
              name: route.name,
              path: route.path,
              component: route.component
                ?.toString()
                .replace('() => import(', '')
                .replace(')', '')
                .replace('/src/', '')
                .replace(/['"]+/g, '')
                .replace(/\?t=\d+$/, ''), // 去除时间戳
              title: route.meta?.title,
              icon:
                typeof route.meta?.icon === 'string'
                  ? route.meta?.icon
                  : route.meta?.icon?.toString().match(/function\s*([^(]*)\(/)?.[1] || '', // 获取图标的名称
              hidden: route.meta?.hidden !== undefined ? route.meta?.hidden : false,
              keepAlive: route.meta?.keepAlive !== undefined ? route.meta?.keepAlive : false,
              parent_name: parentName
            } as unknown as MenuRequest)
            if (route.children && route.children.length > 0) {
              flatten(route.children, route.name)
            }
          }
        })
      }

      // 调用递归函数
      flatten(routeStore.routes)
      return flattenRoutes
    }
  }
})
