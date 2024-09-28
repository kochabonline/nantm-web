import SvgIcon from '@/components/SvgIcon.vue'
import { h, type Component } from 'vue'

/**
 * 获取不同ui库的图标组件, 默认使用iconfont图标
 * @param iconName 图标名称
 * @param ui ui库名称
 * @returns 图标组件
 */
function iconComponent(iconName: string | Component, ui?: string) {
  switch (ui) {
    case 'ant-design':
      if (typeof iconName === 'function') {
        return h(iconName)
      }
      break
    default:
      if (typeof iconName === 'string') {
        return h(SvgIcon, { icon: iconName })
      }
      break
  }
  return h('span')
}

export { iconComponent }
