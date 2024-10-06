/**
 * 创建用户请求
 */
interface CreateUserRequest {
  // 用户名
  username: string
  // 密码
  password: string
  // 昵称
  nickname: string
  // 邮箱
  email: string
  // 角色
  role: number
}

/**
 * 用户模型
 */
interface User {
  // 用户ID
  id: number
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
  // 创建时间
  created_at: string
  // 更新时间
  updated_at: string
  // 删除时间
  deleted_at: string
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

/**
 * table组件用户数据
 */
interface UserColumn extends User {
  key: number
}

export type { CreateUserRequest, User, Users, UserColumn }
