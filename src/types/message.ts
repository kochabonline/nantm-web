import type { Meta } from './common'

/**
 * 消息模型
 */
interface message extends Meta {
  /**
   * 用户ID
   */
  user_id: number
  /**
   * 消息Token
   */
  token: string
  /**
   * 消息类型
   */
  msgtype: string
  /**
   * 消息标题
   */
  title: string
  /**
   * 消息内容
   */
  content: string
  /**
   * 消息状态
   */
  status: string
  /**
   * 附加信息
   */
  payload: string
}

interface Message extends message {
  key: string
}

interface Messages {
  /**
   * 总数
   */
  total: number
  /**
   * 消息列表
   */
  items: Message[]
}

/**
 * 通道模型
 */
interface channel extends Meta {
  /**
   * 通道名称
   */
  name: string
  /**
   * 通道Token
   */
  token: string
  /**
   * 通道提供者
   */
  provider: string
  /**
   * 通道限制器
   */
  limiter: string
  /**
   * 通道提供者配置
   */
  channel_provider: string
  /**
   * 通道限制器配置
   */
  channel_limiter: string
  /**
   * 通道描述
   */
  description: string
}

interface Channel extends channel {
  key: string
}

interface Channels {
  /**
   * 总数
   */
  total: number
  /**
   * 通道列表
   */
  items: Channel[]
}

interface CreateChannelRequest {
  /**
   * 通道名称
   */
  name: string
  /**
   * 通道提供者
   */
  provider: string
  /**
   * 通道限制器
   */
  limiter: string
  /**
   * 通道提供者配置
   */
  channel_provider: string
  /**
   * 通道限制器配置
   */
  channel_limiter: string
  /**
   * 通道描述
   */
  description: string
}

/**
 * 删除通道请求
 */
interface DeleteChannelRequest {
  /**
   * 通道Token
   */
  token: string
}

/**
 * 消息分页查询请求
 */
interface MessagePaginationRequest {
  /**
   * 页码
   */
  page: number
  /**
   * 每页数量
   */
  size: number
  /**
   * 关键字
   */
  keyword: string
}

/**
 * 通道分页查询请求
 */
interface ChannelPaginationRequest {
  /**
   * 页码
   */
  page: number
  /**
   * 每页数量
   */
  size: number
  /**
   * 关键字
   */
  keyword: string
}

export type {
  Message,
  Messages,
  Channel,
  Channels,
  CreateChannelRequest,
  DeleteChannelRequest,
  MessagePaginationRequest,
  ChannelPaginationRequest
}
