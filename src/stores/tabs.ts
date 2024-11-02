import { defineStore } from 'pinia'
import router from '@/router'
import { dynamicRoutes } from '@/router/routes'

// https://cn.vuejs.org/guide/built-ins/keep-alive
// 在 3.2.34 或以上的版本中，使用 <script setup> 的单文件组件会自动根据文件名生成对应的 name 选项
// 例如，一个名为 src/views/Home.vue 的组件会自动设置 name 为 Home
// 可以使用 defineOptions({name: 'Home'}) 来手动设置组件的 name 选项

interface Tab {
  name: string
  title: string
  closable: boolean
  keepAlive: boolean
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as Tab[],
    activeTab: {} as Tab,
    include: [] as string[],
    exclude: [] as string[]
  }),
  persist: [
    {
      key: 'app',
      pick: ['tabs'],
      storage: localStorage
    }
  ],
  getters: {
    getActiveKey(): string {
      return this.activeTab.name
    }
  },
  actions: {
    addTab(tab: Tab) {
      if (!tab.name) return

      const index = this.tabs.findIndex((item) => item.name === tab.name)
      if (index === -1) {
        if (this.hasTab(tab.name)) {
          this.tabs.push(tab)
        }
        // 从exclude中移除，加入到include中
        if (tab.keepAlive) {
          this.include.push(tab.name)
          this.exclude = this.exclude.filter((name) => name !== tab.name)
        }
      }

      this.setActiveTab(tab)
    },
    removeTab(name: string) {
      const index = this.tabs.findIndex((item) => item.name === name)
      if (index !== -1) {
        // 局部变量保存tab, 避免splice后this.tabs[index]为undefined
        const tab = this.tabs[index]
        this.tabs.splice(index, 1)
        // 从include中移除，加入到exclude中
        if (tab.keepAlive) {
          this.exclude.push(name)
          this.include = this.include.filter((item) => item !== name)
        }
      }

      if (this.activeTab.name === name) {
        if (index > 0) {
          this.setActiveTab(this.tabs[index] || this.tabs[index - 1])
        }
      }
    },
    setActiveTab(tab: Tab) {
      this.activeTab.name = tab.name
      // 当前路由不是当前tab路由时，跳转到当前tab路由
      if (router.currentRoute.value.name !== tab.name) {
        router.push({ name: tab.name })
      }
    },
    closeAllTabs() {
      // 保留closable为true的tab
      const closableTabs = this.tabs.filter((tab) => !tab.closable)
      this.tabs = closableTabs
      this.exclude = this.include.filter((name) => !closableTabs.some((tab) => tab.name === name))
      this.include = closableTabs.map((tab) => tab.name)

      this.setActiveTab(this.tabs[0])
    },
    hasTab(name: string): boolean {
      return dynamicRoutes.some((route) => {
        if (route.name === name) {
          return true
        }
        return route.children?.some((child) => child.name === name)
      })
    }
  }
})
