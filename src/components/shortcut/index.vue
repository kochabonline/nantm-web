<template>
  <a-modal v-model:open="open" :title="props.title" @ok="handleOk" :centered="true">
    <h3>
      <p style="margin-left: 10px">{{ props.content }}</p>
    </h3>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, type PropType } from 'vue'

type ShortcutHandler = () => void

const props = defineProps({
  /**
   * 快捷键
   */
  shortcutKey: {
    type: String,
    required: true
  },
  /**
   * 是否按下 alt 键
   */
  altKey: {
    type: Boolean
  },
  /**
   * 是否按下 ctrl 键
   */
  ctrlKey: {
    type: Boolean
  },
  /**
   * 是否按下 shift 键
   */
  shiftKey: {
    type: Boolean
  },
  /**
   * 快捷键回调
   */
  callback: {
    type: Function as PropType<ShortcutHandler>,
    required: true
  },
  /**
   * 提示标题
   */
  title: {
    type: String,
    default: '提示'
  },
  /**
   * 提示内容
   */
  content: {
    type: String
  }
})
const open = ref<boolean>(false)

const handleKeydown = (event: KeyboardEvent) => {
  const { altKey, ctrlKey, shiftKey, shortcutKey } = props

  if (
    (altKey === undefined || event.altKey === altKey) &&
    (ctrlKey === undefined || event.ctrlKey === ctrlKey) &&
    (shiftKey === undefined || event.shiftKey === shiftKey) &&
    event.key === shortcutKey
  ) {
    event.preventDefault()
    open.value = true
  }
}

const handleOk = () => {
  open.value = false
  props.callback()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="less"></style>
