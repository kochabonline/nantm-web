import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

const instance = axios.create({
  baseURL: '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  const authStore = useAuthStore()

  if (authStore.accessToken) {
    config.headers['token'] = authStore.accessToken
  }

  return config
})

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  async (error) => {
    const authStore = useAuthStore()

    const accessTokenExpired = authStore.accessTokenExp < Date.now() / 1000
    const refreshTokenExpired = authStore.refreshTokenExp < Date.now() / 1000

    if (error.response) {
      const { status, data, config } = error.response

      if (status === 401 && accessTokenExpired && !refreshTokenExpired && !config._retry) {
        try {
          config._retry = true

          await authStore.refresh()
          config.headers['token'] = authStore.accessToken

          return instance(config)
        } catch (error) {
          authStore.reset()
          router.push({ name: 'Login' })
        }
      } else if (status === 401 && refreshTokenExpired) {
        authStore.reset()
        message.error('登录已过期, 请重新登录')
        router.push({ name: 'Login' })
      } else if (status !== 200 && data.message) {
        message.error(data.message)
      }

      return Promise.reject(data)
    } else if (error.request) {
      message.error('网络错误, 请刷新重试')
      return Promise.reject(error)
    } else {
      message.error('请求失败')
      return Promise.reject(error)
    }
  }
)

export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.get(url, config)
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.post(url, data, config)
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.put(url, data, config)
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return instance.delete(url, config)
  },
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return instance.patch(url, data, config)
  }
}
