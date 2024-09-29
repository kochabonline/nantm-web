import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { GetUserInfo } from '@/api/modules/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as User
  }),
  getters: {},
  actions: {
    async getUserInfo(id: number) {
      try {
        const response = await GetUserInfo(id)
        if (response.code === 200) {
          this.userInfo = response.data || {}
        } else {
          return Promise.reject(new Error(response.reason))
        }
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
