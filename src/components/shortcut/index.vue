<template>
  <a-modal v-model:open="open" :title="props.title" @ok="handleOk" :centered="true">
    <h3>
      <p style="margin-left: 10px">{{ props.content }}</p>
    </h3>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  /**
   * 快捷键
   */
  keys: {
    type: Array<string>,
    required: true
  },
  /**
   * 是否按下 alt 键
   */
  alt: {
    type: Boolean
  },
  /**
   * 是否按下 ctrl 键
   */
  ctrl: {
    type: Boolean
  },
  /**
   * 是否按下 shift 键
   */
  shift: {
    type: Boolean
  },
  /**
   * 快捷键回调
   */
  callback: {
    type: Function,
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
const pressedKeys = new Set<string>()

const handleKeydown = (event: KeyboardEvent) => {
  pressedKeys.add(event.key.toUpperCase())

  const { alt, ctrl, shift, keys } = props

  if (
    (alt === undefined || event.altKey === alt) &&
    (ctrl === undefined || event.ctrlKey === ctrl) &&
    (shift === undefined || event.shiftKey === shift) &&
    keys.every((key) => pressedKeys.has(key.toUpperCase()))
  ) {
    event.preventDefault()
    open.value = true
  }
}

const handleKeyup = (event: KeyboardEvent) => {
  pressedKeys.delete(event.key)
}

const handleOk = () => {
  open.value = false
  props.callback()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keyup', handleKeyup)
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('keyup', handleKeyup)
})
</script>

<style scoped lang="less"></style>
