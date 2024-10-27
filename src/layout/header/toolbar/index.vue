<template>
  <div class="toolbar">
    <FullScreen size="large" />
    <Avatar />
  </div>
</template>

<script setup lang="ts">
import FullScreen from '@/components/fullScreen/index.vue'
import Avatar from './avatar.vue'
</script>

<style scoped lang="less">
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px; /* 图标之间的间距 */
}

.toolbar > *:last-child {
  margin-right: 10px; /** 最后一个图标距离右边距距离 */
}
</style>
