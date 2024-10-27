import type { Meta } from './common'

/**
 * 角色
 */
interface role extends Meta {
  /**
   * 角色名称
   */
  name: string
  /**
   * 角色描述
   */
  description: string
}

/**
 * table列
 */
interface Role extends role {
  key: string
}

/**
 * 角色列表
 */
interface Roles {
  /**
   * 总数
   */
  total: number
  /**
   * 角色列表
   */
  items: Role[]
}

interface CreateRoleRequest {
  name: string
  description: string
}

export type { Role, Roles, CreateRoleRequest }
