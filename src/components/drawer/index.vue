<template>
  <a-drawer
    :width="props.drawer.width"
    :title="props.title"
    :placement="props.drawer.placement"
    :open="props.open"
    :footer-style="{ textAlign: 'right' }"
    @close="props.onClose"
  >
    <template #footer>
      <a-button style="margin-right: 8px" @click="props.onClose">{{
        props.button.close.title
      }}</a-button>
      <a-button :type="props.button.submit.type" @click="props.onSubmit">{{
        props.button.submit.title
      }}</a-button>
    </template>
    <template #default>
      <slot />
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import type { DrawerProps } from 'ant-design-vue'
import type { Button } from './type'
import { type PropType } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  onClose: {
    type: Function,
    default: () => {}
  },
  onSubmit: {
    type: Function,
    default: () => {}
  },
  drawer: {
    type: Object as PropType<DrawerProps>,
    default: () => ({
      width: 500,
      placement: 'right'
    })
  },
  button: {
    type: Object as PropType<Button>,
    default: () => ({
      close: {
        title: '取消'
      },
      submit: {
        title: '确定',
        type: 'primary'
      }
    })
  }
})
</script>

<style scoped lang="less"></style>
