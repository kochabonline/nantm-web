/**
 * @zh_CN token模型
 */
interface Token {
  /**
   * @zh_CN 主键
   */
  id: number
  /**
   * @zh_CN 用户ID
   */
  user_id: number
  /**
   * @zh_CN UUID
   */
  uuid: string
  /**
   * @zh_CN 访问令牌
   */
  access_token: string
  /**
   * @zh_CN 访问令牌过期时间
   */
  access_token_expires_at: number
  /**
   * @zh_CN 刷新令牌
   */
  refresh_token: string
  /**
   * @zh_CN 刷新令牌过期时间
   */
  refresh_token_expires_at: number
  /**
   * @zh_CN 创建时间
   */
  created_at: number
  /**
   * @zh_CN 更新时间
   */
  updated_at: number | null
  /**
   * @zh_CN 删除时间
   */
  deleted_at: number | null
}

/**
 * @zh_CN 登录请求
 */
interface LoginRequest {
  /**
   * @zh_CN 用户名
   */
  username: string
  /**
   * @zh_CN 密码
   */
  password: string
}

/**
 * @zh_CN 退出登录请求
 */
interface LogoutRequest {
  /**
   * @zh_CN 访问令牌
   */
  access_token: string
  /**
   * @zh_CN 刷新令牌
   */
  refresh_token: string
}

/**
 * @zh_CN 刷新令牌请求
 */
interface RefreshRequest {
  /**
   * @zh_CN 访问令牌
   */
  access_token: string
  /**
   * @zh_CN 刷新令牌
   */
  refresh_token: string
}

export type { Token, LoginRequest, LogoutRequest, RefreshRequest }
