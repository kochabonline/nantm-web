import type { PaginationRequest } from '@/types/request'
import { request } from '../request'

import type { Response } from '@/types/response'
import type { Menu } from '@/types/menu'

const GetMenu = (id: number) => request.get<Response>(`/api/v1/menu/${id}`)
const GetMenus = (data: PaginationRequest) =>
  request.get<Response>('/api/v1/menu', { params: data })
const AddMenu = (data: Menu) => request.post<Response>('/api/v1/menu', data)
const UpdateMenu = (id: number, data: any) => request.put<Response>(`/api/v1/menu/${id}`, data)
const DeleteMenu = (id: number) => request.delete<Response>(`/api/v1/menu/${id}`)

export { GetMenu, GetMenus, AddMenu, UpdateMenu, DeleteMenu }
