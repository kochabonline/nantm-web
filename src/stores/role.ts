import type { PaginationRequest } from '@/types/request'
import { defineStore } from 'pinia'
import { AddRole, DeleteRole, GetRoles } from '@/api/modules/role'
import type { CreateRoleRequest, Role, Roles } from '@/types/role'
import { formatDate } from '@/utils/format'

export const useRoleStore = defineStore('role', {
  state: () => ({
    role: {} as Role,
    roles: { total: 0, items: [] } as Roles
  }),
  getters: {},
  actions: {
    async getRoles(req: PaginationRequest) {
      try {
        const response = await GetRoles(req)
        if (response.code === 200) {
          this.roles = response.data
          this.getData()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async addRole(req: CreateRoleRequest) {
      try {
        const response = await AddRole(req)
        if (response.code === 200) {
          return Promise.resolve()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteRole(id: number) {
      try {
        const response = await DeleteRole(id)
        if (response.code === 200) {
          return Promise.resolve()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    getData() {
      this.roles.items = this.roles.items.map((item, index) => {
        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
