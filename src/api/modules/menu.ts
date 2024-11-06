import { request } from '../request'

import type { Response } from '@/types/response'
import type { MenuRequest, MultiMenuRequest } from '@/types/menu'

const GetMenu = (id: number) => request.get<Response>(`/api/v1/menu/${id}`)
const GetMenus = () => request.get<Response>('/api/v1/menu')
const AddMenu = (data: MenuRequest) => request.post<Response>('/api/v1/menu', data)
const AddMenus = (data: MultiMenuRequest) => request.post<Response>('/api/v1/menu/multi', data)
const UpdateMenu = (id: number, data: any) => request.put<Response>(`/api/v1/menu/${id}`, data)
const DeleteMenu = (id: number) => request.delete<Response>(`/api/v1/menu/${id}`)

export { GetMenu, GetMenus, AddMenu, AddMenus, UpdateMenu, DeleteMenu }
