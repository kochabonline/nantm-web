import type { PaginationRequest } from '@/types/request'
import { request } from '../request'
import type { Api, Apis, CreateApiRequest } from '@/types/api'
import type { Response } from '@/types/response'

const AddApi = (data: CreateApiRequest) => request.post<Response>('/api/v1/api', data)
const UpdateApi = (data: Api) => request.put<Response>('/api/v1/api', data)
const DeleteApi = (id: number) => request.delete<Response>(`/api/v1/api/${id}`)
const GetApis = (req: PaginationRequest) =>
  request.get<Response<Apis>>('/api/v1/api', { params: req })

export { AddApi, UpdateApi, DeleteApi, GetApis }
