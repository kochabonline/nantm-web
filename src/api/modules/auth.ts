import { request } from '../request'

import type { Response } from '@/types/response'
import type { Token, LoginRequest, LogoutRequest } from '@/types/token'

export const Login = (data: LoginRequest) => request.post<Response<Token>>('/api/v1/login', data)

export const Logout = (data: LogoutRequest) => request.delete<Response>('/api/v1/logout', data)
