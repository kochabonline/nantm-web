<template>
  <a-button :type="props.type" :icon="props.icon" @click="props.onClick"></a-button>
</template>

<script setup lang="ts">
import { h, type Component, type PropType } from 'vue'
import { FullscreenOutlined } from '@ant-design/icons-vue'

const props = defineProps({
  /**
   * 全屏按钮类型
   */
  type: {
    type: String as PropType<'text' | 'primary' | 'ghost' | 'dashed' | 'link'>,
    default: 'text'
  },
  /**
   * 全屏按钮图标
   */
  icon: {
    type: Object as PropType<Component>,
    default: () => h(FullscreenOutlined)
  },
  /**
   * 全屏按钮点击事件
   */
  onClick: {
    type: Function as PropType<() => void>,
    default: () => {
      const handleFullScreen = () => {
        const element = document.documentElement
        if (document.fullscreenElement) {
          document.exitFullscreen()
        } else {
          element.requestFullscreen()
        }
      }
      return handleFullScreen
    }
  }
})
</script>

<style scoped lang="less"></style>
