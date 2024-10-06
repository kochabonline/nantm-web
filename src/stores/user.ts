import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import type { CreateUserRequest, User, Users, UserColumn } from '@/types/user'
import { AddUser, DeleteUser, GetUserInfo, GetUserList } from '@/api/modules/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    userInfo: {} as User,
    userList: {} as Users,
    data: [] as UserColumn[]
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
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserInfo(id: number) {
      try {
        const response = await GetUserInfo(id)
        if (response.code === 200) {
          this.userInfo = response.data
        } else {
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getUserList() {
      try {
        const response = await GetUserList()
        if (response.code === 200) {
          this.userList = response.data
          this.getData()
        } else {
          throw new Error(response.reason)
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
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    getData() {
      this.data = this.userList.items.map((item) => {
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
        if (typeof item.status === 'number') {
          switch (item.status) {
            case 1:
              item.status = '活跃'
              break
            case 2:
              item.status = '未激活'
              break
            default:
              item.status = '未知'
          }
        }
        if (typeof item.created_at === 'number') {
          item.created_at = dayjs.unix(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        }

        return {
          key: item.id,
          ...item
        }
      })
    }
  }
})
