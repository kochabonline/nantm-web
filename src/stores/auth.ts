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

function isValidJwt(token: string): boolean {
  const parts = token.split('.')
  return parts.length === 3
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
    userId: (state) =>
      computed(() =>
        isValidJwt(state.accessToken) ? jwtDecode<CustomJwtPayload>(state.accessToken).userId : 0
      ).value,
    username: (state) =>
      computed(() =>
        isValidJwt(state.accessToken) ? jwtDecode<CustomJwtPayload>(state.accessToken).username : ''
      ).value,
    userRole: (state) =>
      computed(() =>
        isValidJwt(state.accessToken) ? jwtDecode<CustomJwtPayload>(state.accessToken).userRole : ''
      ).value,
    accessTokenExp: (state) =>
      computed(() =>
        isValidJwt(state.accessToken) ? jwtDecode<CustomJwtPayload>(state.accessToken).exp : 0
      ).value,
    refreshTokenExp: (state) =>
      computed(() =>
        isValidJwt(state.refreshToken) ? jwtDecode<CustomJwtPayload>(state.refreshToken).exp : 0
      ).value
  },
  actions: {
    async login(req: LoginRequest) {
      try {
        this.loading = true

        const response = await Login(req)
        if (response.code === 200) {
          this.accessToken = response.data.access_token
          this.refreshToken = response.data.refresh_token

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
    async logout() {
      try {
        const req: LogoutRequest = {
          refresh_token: this.refreshToken
        }
        const response = await Logout(req)
        if (response.code === 200) {
          const currentRoute = router.currentRoute.value.fullPath
          router.push({ name: 'Login', query: { redirect: currentRoute } })

          this.$reset()
        } else {
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
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
    async getUserInfo() {
      const userStore = useUserStore()
      if (this.fetchUserInfo) return
      try {
        await userStore.getUser(this.userId)
        this.fetchUserInfo = true
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async reset() {
      this.$reset()
    }
  }
})
