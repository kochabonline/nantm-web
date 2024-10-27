<template>
  <a-button :type="props.type" :icon="props.icon" :size="props.size" @click="onClick"></a-button>
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
   * 按钮大小
   */
  size: {
    type: String as PropType<'large' | 'middle' | 'small'>,
    default: 'middle'
  }
})

const onClick = () => {
  const element = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    element.requestFullscreen()
  }
}
</script>

<style scoped lang="less"></style>
