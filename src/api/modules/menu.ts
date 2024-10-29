import { request } from '../request'

import type { Response } from '@/types/response'

const GetMenu = (id: number) => request.get<Response>(`/api/v1/menu/${id}`)
const GetMenus = () => request.get<Response>('/api/v1/menu')
const AddMenu = (data: any) => request.post<Response>('/api/v1/menu', data)
const UpdateMenu = (id: number, data: any) => request.put<Response>(`/api/v1/menu/${id}`, data)
const DeleteMenu = (id: number) => request.delete<Response>(`/api/v1/menu/${id}`)

export { GetMenu, GetMenus, AddMenu, UpdateMenu, DeleteMenu }
