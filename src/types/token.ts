/**
 * token模型
 */
interface Token {
  /**
   * 访问令牌
   */
  access_token: string
  /**
   * 刷新令牌
   */
  refresh_token: string
}

/**
 * 登录请求
 */
interface LoginRequest {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
}

/**
 * 退出登录请求
 */
interface LogoutRequest {
  /**
   * 刷新令牌
   */
  refresh_token: string
}

/**
 * 刷新令牌请求
 */
interface RefreshRequest {
  /**
   * 刷新令牌
   */
  refresh_token: string
}

export type { Token, LoginRequest, LogoutRequest, RefreshRequest }
