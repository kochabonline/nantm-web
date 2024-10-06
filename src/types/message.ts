/**
 * 消息模型
 */
interface Message {
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
   * 创建时间
   */
  created_at: string
  /**
   * 附加信息
   */
  payload: string
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

interface MessageColumn extends Message {
  key: number
}

/**
 * 通道模型
 */
interface Channel {
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
  /**
   * 创建时间
   */
  created_at: string
  /**
   * 更新时间
   */
  updated_at: string
  /**
   * 删除时间
   */
  deleted_at: string
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

// Table组件项
interface ChannelColumn extends Channel {
  key: number
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

export type {
  Message,
  Messages,
  MessageColumn,
  Channel,
  Channels,
  ChannelColumn,
  CreateChannelRequest
}
