import { defineComponent, h, type Component, type PropType } from 'vue'
import SvgIcon from '@/components/icon/SvgIconView.vue'

const iconComponent = defineComponent({
  props: {
    icon: {
      type: [String, Function] as PropType<string | Component>,
      required: true
    }
  },
  setup(props) {
    const { icon } = props
    const iconComponent = () => {
      if (typeof icon === 'string') {
        return h(SvgIcon, { icon: icon })
      }
      if (typeof icon === 'function') {
        return h(icon)
      }
      return h('span')
    }

    return iconComponent
  }
})

export { iconComponent }
