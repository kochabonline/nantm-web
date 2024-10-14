import { request } from '../request'

import type { Response } from '@/types/response'
import type { Token, LoginRequest, LogoutRequest, RefreshRequest } from '@/types/token'

const Login = (data: LoginRequest) => request.post<Response<Token>>('/api/v1/auth/login', data)
const Logout = (data: LogoutRequest) =>
  request.delete<Response>('/api/v1/auth/logout', { params: data })
const Refresh = (data: RefreshRequest) =>
  request.post<Response<string>>('/api/v1/auth/refresh', data)

export { Login, Logout, Refresh }
