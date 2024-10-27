import { AddApi, DeleteApi, GetApis } from '@/api/modules/api'
import type { Api, Apis, CreateApiRequest } from '@/types/api'
import type { PaginationRequest } from '@/types/request'
import { formatDate } from '@/utils/format'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', {
  state: () => ({
    api: {} as Api,
    apis: { total: 0, items: [] } as Apis
  }),
  actions: {
    async getApis(req: PaginationRequest) {
      try {
        const response = await GetApis(req)
        if (response.code === 200) {
          this.apis = response.data
          this.formatData()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        throw Promise.reject(error)
      }
    },
    async addApi(req: CreateApiRequest) {
      try {
        const response = await AddApi(req)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        throw Promise.reject(error)
      }
    },
    async deleteApi(id: number) {
      try {
        const response = await DeleteApi(id)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        throw Promise.reject(error)
      }
    },
    formatData() {
      this.apis.items = this.apis.items.map((item, index) => {
        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
