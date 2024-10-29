import { defineStore } from 'pinia'
import type { UserRequest, User, Users } from '@/types/user'
import { AddUser, DeleteUser, GetUser, GetUsers, UpdateUser } from '@/api/modules/user'
import { formatDate } from '@/utils/format'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
    users: { total: 0, items: [] } as Users
  }),
  getters: {},
  actions: {
    /**
     * 创建用户
     * @param UserRequest 创建用户请求
     */
    async addUser(req: UserRequest) {
      try {
        const response = await AddUser(req)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUser(id: number) {
      try {
        const response = await GetUser(id)
        if (response.code === 200) {
          this.user = response.data
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUsers() {
      try {
        const response = await GetUsers()
        if (response.code === 200) {
          this.users = response.data
          this.formatData()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async updateUser(id: number, data: UserRequest) {
      try {
        const response = await UpdateUser(id, data)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        throw Promise.reject(error)
      }
    },
    async deleteUser(id: number) {
      try {
        const response = await DeleteUser(id)
        if (response.code != 200) {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    formatData() {
      this.users.items = this.users.items.map((item, index) => {
        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
