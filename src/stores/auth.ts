import { computed } from 'vue'
import { defineStore } from 'pinia'
import { jwtDecode, type JwtPayload } from 'jwt-decode'

import { Login, Logout, Refresh } from '@/api/modules/auth'
import type { LoginRequest, LogoutRequest, RefreshRequest } from '@/types/token'
import router from '@/router'
import { useUserStore } from './user'

interface CustomJwtPayload extends JwtPayload {
  exp: number
  userId: number
  username: string
  userRole: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    remember: false,
    fetchUserInfo: false,
    accessToken: localStorage.getItem('token.accessToken') || '',
    refreshToken: localStorage.getItem('token.refreshToken') || ''
  }),
  persist: [
    {
      key: 'token',
      pick: ['accessToken', 'refreshToken'],
      storage: localStorage
    }
  ],
  getters: {
    isAuthenticated: (state) => computed(() => !!state.accessToken).value,
    isFetchUserInfo: (state) => computed(() => state.fetchUserInfo).value,
    userId: (state) => computed(() => jwtDecode<CustomJwtPayload>(state.accessToken).userId).value,
    username: (state) => computed(() => jwtDecode<CustomJwtPayload>(state.accessToken).username).value,
    userRole: (state) =>
      computed(() => jwtDecode<CustomJwtPayload>(state.accessToken).userRole).value,
    accessTokenExp: (state) =>
      computed(() => jwtDecode<CustomJwtPayload>(state.accessToken).exp).value,
    refreshTokenExp: (state) =>
      computed(() => jwtDecode<CustomJwtPayload>(state.refreshToken).exp).value
  },
  actions: {
    /**
     * 账号密码登录
     * @param req 账号密码登录请求
     */
    async login(req: LoginRequest) {
      try {
        this.loading = true

        const response = await Login(req)
        if (response.code === 200) {
          this.accessToken = response.data.access_token
          this.refreshToken = response.data.refresh_token

          // 存在 redirect 查询参数，则跳转到该地址
          const redirect = (router.currentRoute.value.query.redirect as string) || {
            name: 'Dashboard'
          }
          router.push(redirect)
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      } finally {
        this.loading = false
      }
    },
    /**
     * 退出登录
     */
    async logout() {
      try {
        const req: LogoutRequest = {
          refresh_token: this.refreshToken
        }
        const response = await Logout(req)
        if (response.code === 200) {
          this.$reset()
          // 在退出登录后，将当前地址作为查询参数附加到登录路由中
          const currentRoute = router.currentRoute.value.fullPath
          router.push({ name: 'Login', query: { redirect: currentRoute } })
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * 刷新 token
     */
    async refresh() {
      try {
        const req: RefreshRequest = {
          refresh_token: this.refreshToken
        }
        const response = await Refresh(req)
        if (response.code === 200) {
          this.accessToken = response.data
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * 获取用户信息
     * @returns 用户信息
     */
    async getUserInfo() {
      const userStore = useUserStore()
      if (this.fetchUserInfo) return
      try {
        await userStore.getUserInfo(this.userId)
        this.fetchUserInfo = true
      } catch (error) {
        return Promise.reject(error)
      }
    },
    /**
     * 重置 store
     */
    async reset() {
      this.$reset()
    }
  }
})
