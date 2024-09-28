<template>
  <a-modal
    v-model:open="open"
    :title="props.title"
    @ok="handleOk"
    cancelText="取消"
    okText="确认"
    :centered="true"
  >
    <h3>
      <p style="margin-left: 10px">{{ props.content }}</p>
    </h3>
  </a-modal>
</template>

<script setup lang="ts">
import { defineProps, onMounted, onBeforeUnmount, ref, type PropType } from 'vue'

type ShortcutHandler = () => void

const props = defineProps({
  shortcutKey: {
    type: String,
    required: true
  },
  altKey: {
    type: Boolean
  },
  ctrlKey: {
    type: Boolean
  },
  shiftKey: {
    type: Boolean
  },
  callback: {
    type: Function as PropType<ShortcutHandler>,
    required: true
  },
  title: {
    type: String,
    default: '提示'
  },
  content: {
    type: String
  }
})
const open = ref<boolean>(false)

const handleKeydown = (event: KeyboardEvent) => {
  const { altKey, ctrlKey, shiftKey, shortcutKey } = props
  console.log('altKey:', altKey)
  console.log('ctrlKey:', ctrlKey)
  console.log('shiftKey:', shiftKey)
  console.log('event:', event)

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
