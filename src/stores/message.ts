import { GetMessages, GetChannels, AddChannel, DeleteChannel } from '@/api/modules/message'
import type {
  Channels,
  ChannelTableData,
  MessageTableData,
  Messages,
  CreateChannelRequest,
  DeleteChannelRequest,
  MessagePaginationRequest
} from '@/types/message'
import { defineStore } from 'pinia'
import { formatDate } from '@/utils/format'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: {} as Messages,
    messagesData: [] as MessageTableData[],
    channels: {} as Channels,
    channelsData: [] as ChannelTableData[]
  }),
  actions: {
    async getMessages(data: MessagePaginationRequest) {
      try {
        const response = await GetMessages(data)
        if (response.code === 200) {
          this.messages = response.data
          this.getMessagesData()
        } else {
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async getChannels() {
      try {
        const response = await GetChannels()
        if (response.code === 200) {
          this.channels = response.data
          this.getChannelsData()
        } else {
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async addChannel(data: CreateChannelRequest) {
      try {
        const response = await AddChannel(data)
        if (response.code === 200) {
          return 'ok'
        } else {
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async deleteChannel(data: DeleteChannelRequest) {
      try {
        const response = await DeleteChannel(data)
        if (response.code === 200) {
          return 'ok'
        } else {
          throw new Error(response.reason)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    getMessagesData() {
      if (this.messages && Array.isArray(this.messages.items)) {
        this.messagesData = this.messages.items.map((item, index) => {
          return {
            ...item,
            key: index,
            created_at: formatDate(item.created_at)
          }
        })
      }
    },
    getChannelsData() {
      if (this.channels && Array.isArray(this.channels.items)) {
        this.channelsData = this.channels.items.map((item, index) => {
          return {
            ...item,
            key: index,
            created_at: formatDate(item.created_at)
          }
        })
      }
    }
  }
})
