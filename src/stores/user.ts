import { defineStore } from 'pinia'
import type { CreateUserRequest, User, Users } from '@/types/user'
import { AddUser, DeleteUser, GetUserInfo, GetUserList } from '@/api/modules/user'
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
     * @param CreateUserRequest 创建用户请求
     * @returns Response<User>
     */
    async addUser(req: CreateUserRequest) {
      try {
        const response = await AddUser(req)
        if (response.code === 200) {
          return 'ok'
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo(id: number) {
      try {
        const response = await GetUserInfo(id)
        if (response.code === 200) {
          this.user = response.data
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserList() {
      try {
        const response = await GetUserList()
        if (response.code === 200) {
          this.users = response.data
          this.getData()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteUser(id: number) {
      try {
        const response = await DeleteUser(id)
        if (response.code === 200) {
          return 'ok'
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    getData() {
      this.users.items = this.users.items.map((item, index) => {
        if (typeof item.role === 'number') {
          switch (item.role) {
            case 1:
              item.role = '普通用户'
              break
            case 2:
              item.role = '管理员'
              break
            default:
              item.role = '未知'
          }
        }

        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
