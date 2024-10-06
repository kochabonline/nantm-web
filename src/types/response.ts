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

export type { Response }
