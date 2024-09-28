import type { Component } from 'vue'
import type { RouteMeta } from 'vue-router'

interface MenuProps {
  /**
   * @zh_CN 菜单是否折叠
   * @default false
   */
  collapsed?: boolean
  /**
   * @zh_CN 当前展开的 SubMenu 菜单项 key 数组
   * @default []
   */
  openKeys?: string[]
  /**
   * @zh_CN 当前选中的菜单项 key 数组
   * @default []
   */
  selectedKeys?: string[]
}

interface Menu {
  meta: RouteMeta
  /**
   * @zh_CN 菜单项的唯一标志
   */
  key: string
  /**
   * @zh_CN 菜单项标题
   */
  label: string
  /**
   * @zh_CN 设置收缩时展示的悬浮标题
   */
  title: string
  /**
   * @zh_CN 菜单项图标
   */
  icon?: Component
  /**
   * @zh_CN 子菜单的菜单项
   */
  children?: Menu[]
}

export type { MenuProps, Menu }
