import type { Meta } from './common'

interface menu extends Meta {
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
  children: Menu[]
  /** 菜单元数据 */
  meta: meta
}

interface meta {
  /** 菜单图标 */
  icon: string
  /** 是否隐藏菜单 */
  hidden: boolean
  /** 是否缓存菜单 */
  noCache: boolean
  /** 是否固定菜单 */
  affix: boolean
  /** 是否固定标签 */
  tag: boolean
}

interface Menu extends menu {
  key: string
}

interface Menus {
    total: number
    items: Menu[]
}

export type { Menu, Menus }
