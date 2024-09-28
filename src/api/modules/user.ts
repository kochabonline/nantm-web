import { request } from '../request'

import type { Response } from '@/types/response'
import type { User } from '@/types/user'

export const GetUser = (id: number) => request.get<Response<User>>(`/api/v1/user/${id}`)
