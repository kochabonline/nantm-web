import type { Meta } from './common'

/**
 * 创建用户请求
 */
interface UserRequest {
  // 用户名
  username: string
  // 密码
  password: string
  // 昵称
  nickname: string
  // 邮箱
  email: string
  // 角色
  role: string
}

/**
 * 用户模型
 */
interface user extends Meta {
  // 用户名
  username: string
  // 昵称
  nickname: string
  // 邮箱
  email: string
  // 角色
  role: string
  // 状态
  status: string
  // 头像
  avatar: string
}

interface User extends user {
  key: string
}

/**
 * 用户列表响应
 */
interface Users {
  // 总数
  total: number
  // 用户列表
  items: User[]
}

export type { UserRequest, User, Users }
