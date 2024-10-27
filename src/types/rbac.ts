/**
 * RBAC 权限策略
 */
interface policy {
  id: number
  /** 角色 */
  role: string
  /** 资源 */
  path: string
  /** 请求方法 */
  method: string
}

interface Policy extends policy {
  key: string
}

interface ApiPolicies {
  Policies: Policy[]
}

export type { Policy, ApiPolicies }
