import type { CreateRoleRequest, Roles } from '@/types/role'
import { request } from '../request'

import type { Response } from '@/types/response'
import type { PaginationRequest } from '@/types/request'

const GetRoles = (params: PaginationRequest) =>
  request.get<Response<Roles>>('/api/v1/role', { params: params })
const AddRole = (data: CreateRoleRequest) => request.post<Response>('/api/v1/role', data)
const DeleteRole = (id: number) => request.delete<Response>(`/api/v1/role/${id}`)

export { GetRoles, AddRole, DeleteRole }
