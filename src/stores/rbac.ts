import { AddPolicy } from '@/api/modules/rbac'
import type { Policy } from '@/types/rbac'
import { defineStore } from 'pinia'

export const useRbacStore = defineStore('rbac', {
  state: () => ({}),
  getters: {},
  actions: {
    async addPolicies(rules: Policy[]) {
      try {
        const response = await AddPolicy({ rules })
        if (response.code === 200) {
          return 'ok'
        }
        throw new Error(response.reason)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
