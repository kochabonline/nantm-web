import type {
  Channel,
  Channels,
  CreateChannelRequest,
  DeleteChannelRequest,
  MessagePaginationRequest,
  Messages
} from '@/types/message'
import { request } from '../request'

import type { Response } from '@/types/response'

const GetMessages = (data: MessagePaginationRequest) =>
  request.get<Response<Messages>>('/api/v1/message', { params: data })
const GetChannels = () => request.get<Response<Channels>>('/api/v1/message/channel')
const AddChannel = (data: CreateChannelRequest) =>
  request.post<Response<Channel>>('/api/v1/message/channel', data)
const DeleteChannel = (params: DeleteChannelRequest) => {
  return request.delete<Response>(`/api/v1/message/channel`, { params: params })
}

export { GetMessages, GetChannels, AddChannel, DeleteChannel }
