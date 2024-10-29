import { request } from '../request'

import type { Response } from '@/types/response'
import type { UserRequest, User, Users } from '@/types/user'

const GetUser = (id: number) => request.get<Response<User>>(`/api/v1/user/${id}`)
const GetUsers = () => request.get<Response<Users>>('/api/v1/user')
const AddUser = (data: UserRequest) => request.post<Response>('/api/v1/user/register', data)
const UpdateUser = (id: number, data: UserRequest) =>
  request.put<Response>(`/api/v1/user/${id}`, data)
const DeleteUser = (id: number) => request.delete<Response>(`/api/v1/user/${id}`)

export { GetUser, GetUsers, AddUser, UpdateUser, DeleteUser }
