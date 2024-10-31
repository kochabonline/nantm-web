import { AddMenu } from '@/api/modules/menu'
import type { Menu, Menus } from '@/types/menu'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    menu: {} as Menu,
    menus: { total: 0, items: [] } as Menus
  }),
  getters: {},
  actions: {
    async addMenu(data: Menu) {
      try {
        const response = await AddMenu(data)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
