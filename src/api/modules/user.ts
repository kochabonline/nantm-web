import { request } from '../request'

import type { Response } from '@/types/response'
import type { CreateUserRequest, User, Users } from '@/types/user'

const GetUserInfo = (id: number) => request.get<Response<User>>(`/api/v1/user/${id}`)
const GetUserList = () => request.get<Response<Users>>('/api/v1/user')
const AddUser = (data: CreateUserRequest) => request.post<Response<User>>('/api/v1/register', data)
const UpdateUser = (id: number, data: User) =>
  request.put<Response<User>>(`/api/v1/user/${id}`, data)
const DeleteUser = (id: number) => request.delete<Response<User>>(`/api/v1/user/${id}`)

export { GetUserInfo, GetUserList, AddUser, UpdateUser, DeleteUser }
