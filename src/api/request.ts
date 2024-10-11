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
    if (error.response) {
      const { status, data, config } = error.response
      const authStore = useAuthStore()
      if (status === 401 && data.reason === '访问令牌已过期') {
        try {
          await authStore.refresh()
          // 从新设置 access_token
          config.headers['token'] = authStore.accessToken
          // 重新请求
          return instance.request(config)
        } catch (error) {
          authStore.logout()
          router.push({ name: 'Login' })
        }
      } else if (status === 401 && data.reason === '登录已过期') {
        message.error('登录已过期，请重新登录')
        router.push({ name: 'Login' })
      } else if (status !== 200 && data.reason) {
        message.error(data.reason)
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
