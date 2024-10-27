import { GetMessages, GetChannels, AddChannel, DeleteChannel } from '@/api/modules/message'
import type {
  Channels,
  Messages,
  CreateChannelRequest,
  DeleteChannelRequest,
  MessagePaginationRequest
} from '@/types/message'
import { defineStore } from 'pinia'
import { formatDate } from '@/utils/format'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: { total: 0, items: [] } as Messages,
    channels: { total: 0, items: [] } as Channels
  }),
  actions: {
    async getMessages(data: MessagePaginationRequest) {
      try {
        const response = await GetMessages(data)
        if (response.code === 200) {
          this.messages = response.data
          this.formatMessagesData()
        } else {
          throw new Error(response.message)
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
          this.formatChannelsData()
        } else {
          throw new Error(response.message)
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
          throw new Error(response.message)
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
          throw new Error(response.message)
        }
      } catch (error) {
        return Promise.reject(error)
      }
    },
    formatMessagesData() {
      this.messages.items = this.messages.items.map((item, index) => {
        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    },
    formatChannelsData() {
      this.channels.items = this.channels.items.map((item, index) => {
        switch (item.limiter) {
          case 'token_bucket':
            item.limiter = '令牌桶'
            break
          case 'sliding_window':
            item.limiter = '滑动窗口'
            break
        }

        return {
          ...item,
          key: index.toString(),
          created_at: formatDate(item.created_at)
        }
      })
    }
  }
})
