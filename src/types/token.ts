/**
 * @zh_CN token模型
 */
interface Token {
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
   * @zh_CN 刷新令牌
   */
  refresh_token: string
}

/**
 * @zh_CN 刷新令牌请求
 */
interface RefreshRequest {
  /**
   * @zh_CN 刷新令牌
   */
  refresh_token: string
}

export type { Token, LoginRequest, LogoutRequest, RefreshRequest }
