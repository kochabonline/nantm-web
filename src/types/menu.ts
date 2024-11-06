import type { Meta } from './common'

interface menu extends Meta, meta {
  /** 父级菜单id */
  parent_id: number
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单组件 */
  component: string
  /** 菜单重定向 */
  redirect: string
  /** 子菜单 */
  children?: Menu[]
}

interface meta {
  /** 菜单图标 */
  icon: string
  /** 是否隐藏菜单 */
  hidden: boolean
  /** 是否缓存菜单 */
  keepAlive: boolean
  /** 菜单标题 */
  title: string
  /** 菜单排序 */
  order: number
}

interface Menu extends menu {
  key: string
}

interface MenuRequest {
  /** 父级菜单名称 */
  parent_name: string
  /** 菜单名称 */
  name: string
  /** 菜单路径 */
  path: string
  /** 菜单组件 */
  component: string
  /** 菜单重定向 */
  redirect: string
  /** 菜单图标 */
  icon: string
  /** 是否隐藏菜单 */
  hidden: boolean
  /** 是否缓存菜单 */
  keepAlive: boolean
  /** 菜单标题 */
  title: string
  /** 菜单排序 */
  order: number
}

interface MultiMenuRequest {
  menus: MenuRequest[]
}

export type { Menu, MenuRequest, MultiMenuRequest }
