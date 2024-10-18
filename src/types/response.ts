/**
 * @zh_CN 响应数据
 */
interface Response<T = any> {
  /**
   * @zh_CN 状态码
   */
  code: number
  /**
   * @zh_CN 数据
   */
  data: T
  /**
   * @zh_CN 消息
   */
  reason: string
}

/**
 * 响应元数据
 */
interface Meta {
  /**
   * @zh_CN 主键
   */
  id: number
  /**
   * @zh_CN 创建时间
   */
  created_at: string
  /**
   * @zh_CN 更新时间
   */
  updated_at: string
  /**
   * @zh_CN 删除时间
   */
  deleted_at: string
}

export type { Response, Meta }
