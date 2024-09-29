import { computed } from 'vue'
import { defineStore } from 'pinia'

import { Login, Logout } from '@/api/modules/auth'
import type { LoginRequest, LogoutRequest } from '@/types/token'
import router from '@/router'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    remember: false,
    fetchUserInfo: false,
    user_id: Number(localStorage.getItem('info.userId')) || 0,
    accessToken: sessionStorage.getItem('session.accessToken') || '',
    refreshToken: sessionStorage.getItem('session.refreshToken') || ''
  }),
  persist: [
    {
      key: 'session',
      pick: ['accessToken', 'refreshToken'],
      storage: sessionStorage
    },
    {
      key: 'info',
      pick: ['user_id'],
      storage: localStorage
    }
  ],
  getters: {
    isAuthenticated: (state) => computed(() => !!state.accessToken).value,
    isFetchUserInfo: (state) => computed(() => state.fetchUserInfo).value
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
          this.accessToken = response.data?.access_token || ''
          this.refreshToken = response.data?.refresh_token || ''
          this.user_id = response.data?.user_id || 0

          // 存在 redirect 查询参数，则跳转到该地址
          const redirect = (router.currentRoute.value.query.redirect as string) || {
            name: 'Dashboard'
          }
          router.push(redirect)
        } else {
          return Promise.reject(new Error(response.reason))
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
          access_token: this.accessToken,
          refresh_token: this.refreshToken
        }
        const response = await Logout(req)
        if (response.code === 200) {
          this.$reset()
          // 在退出登录后，将当前地址作为查询参数附加到登录路由中
          const currentRoute = router.currentRoute.value.fullPath
          router.push({ name: 'Login', query: { redirect: currentRoute } })
        } else {
          return Promise.reject(new Error(response.reason))
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    // 获取用户信息
    async getUserInfo() {
      const userStore = useUserStore()
      if (this.fetchUserInfo) return
      try {
        await userStore.getUserInfo(this.user_id)
        this.fetchUserInfo = true
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }
})
