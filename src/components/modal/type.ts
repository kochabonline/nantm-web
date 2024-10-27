import type { Component } from 'vue'

/**
 * 按钮
 */
interface Button {
  /** 按钮标题 */
  title: string
  /** 按钮类型 */
  type: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
  /** 按钮图标 */
  icon: string | Component
}

export type { Button }
