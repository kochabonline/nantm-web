import type { PaginationRequest } from '@/types/request'
import { defineStore } from 'pinia'
import { DeleteRole, GetRoles } from '@/api/modules/role'
import type { Role, RoleTableData, Roles } from '@/types/role'
import { formatDate } from '@/utils/format'

export const useRoleStore = defineStore('role', {
  state: () => ({
    role: {} as Role,
    roles: {} as Roles,
    data: [] as RoleTableData[]
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
          throw new Error(response.reason)
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
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    getData() {
      this.data = this.roles.items.map((item) => {
        return {
          ...item,
          key: item.id,
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
