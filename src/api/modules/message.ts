import type { Channel, Channels, CreateChannelRequest, Messages } from '@/types/message'
import { request } from '../request'

import type { Response } from '@/types/response'

const GetMessages = () => request.get<Response<Messages>>('/api/v1/message')
const GetChannels = () => request.get<Response<Channels>>('/api/v1/message/channel')
const AddChannel = (data: CreateChannelRequest) =>
  request.post<Response<Channel>>('/api/v1/message/channel', data)

export { GetMessages, GetChannels, AddChannel }
