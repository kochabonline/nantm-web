import { defineStore } from 'pinia'
import router from '@/router'

interface Tab {
  name: string
  title: string
  keepalive: boolean
  closable: boolean
}

export const useTabsStore = defineStore('tabs', {
  state: () => ({
    tabs: [] as Tab[],
    activeTab: {} as Tab,
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
    getTabs(): Tab[] {
      return this.tabs
    },
    getActiveKey(): string {
      return this.activeTab.name
    },
    getExclude(): string[] {
      return this.exclude
    }
  },
  actions: {
    addTab(tab: Tab) {
      if (!tab.name) return

      const index = this.tabs.findIndex((item) => item.name === tab.name)
      if (index === -1) {
        this.tabs.push(tab)
      }

      this.setActiveTab(tab)
    },
    removeTab(name: string) {
      const index = this.tabs.findIndex((item) => item.name === name)
      if (index !== -1) {
        this.tabs.splice(index, 1)
      }

      if (this.activeTab.name === name) {
        if (index > 0) {
          this.setActiveTab(this.tabs[index] || this.tabs[index - 1])
        }
      }

      // keepalive排除列表
      if (!this.exclude.includes(name)) {
        router.push({ name: this.activeTab.name })
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
      this.tabs = this.tabs.splice(0, 1)
      this.setActiveTab(this.tabs[0])
    }
  }
})
