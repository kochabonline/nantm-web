<template>
  <a-button type="text" :icon="h(FullscreenOutlined)" @click="handleFullScreen"></a-button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { FullscreenOutlined } from '@ant-design/icons-vue'

const handleFullScreen = () => {
  const element = document.documentElement
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    element.requestFullscreen()
  }
}
</script>

<style scoped lang="less"></style>
