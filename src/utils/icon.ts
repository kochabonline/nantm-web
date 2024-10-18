import SvgIcon from '@/components/icon/svg.vue'
import { h, type Component } from 'vue'

/**
 * 获取不同ui库的图标组件, 默认使用iconfont图标
 * @param icon 图标名称
 * @param ui ui库名称
 * @returns 图标组件
 */
function iconComponent(icon: string | Component, ui?: string | undefined): Component {
  switch (ui) {
    case 'ant-design':
      if (typeof icon === 'function') {
        return h(icon)
      }
      break
    default:
      if (typeof icon === 'string') {
        return h(SvgIcon, { icon: icon })
      }
      if (typeof icon === 'function') {
        return h(icon)
      }
      break
  }
  return h('span')
}

export { iconComponent }
