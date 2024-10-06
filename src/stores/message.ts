import { GetMessages, GetChannels, AddChannel } from '@/api/modules/message'
import type { Channels, ChannelColumn, MessageColumn, Messages, CreateChannelRequest } from '@/types/message'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'

export const useMessageStore = defineStore('message', {
  state: () => ({
    messages: {} as Messages,
    messagesData: [] as MessageColumn[],
    channels: {} as Channels,
    channelsData: [] as ChannelColumn[]
  }),
  actions: {
    async getMessages() {
      try {
        const response = await GetMessages()
        if (response.code === 200) {
          this.messages = response.data
          await this.getMessagesData()
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
          await this.getChannelsData()
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
    async getMessagesData() {
      this.messagesData = this.messages.items.map((item, index) => {
        if (typeof item.created_at === 'number') {
          item.created_at = dayjs.unix(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        }

        return {
          key: index,
          ...item
        }
      })
    },
    async getChannelsData() {
      this.channelsData = this.channels.items.map((item, index) => {
        if (typeof item.created_at === 'number') {
          item.created_at = dayjs.unix(item.created_at).format('YYYY-MM-DD HH:mm:ss')
        }

        return {
          // TODO: 使用id作为key
          key: index,
          ...item
        }
      })
    }
  }
})
