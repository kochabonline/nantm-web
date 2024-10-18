import type { Meta } from './response'

/**
 * 角色
 */
interface Role extends Meta {
  /**
   * 角色ID
   */
  id: number
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
interface RoleTableData extends Role {
  key: number
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

export type { Role, RoleTableData, Roles }
