<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="layout-header">
      <Breadcrumb />
      <div class="layout-header-right">
        <a-space :size="10">
          <FullScreen />
          <Avatar />
        </a-space>
      </div>
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/BreadcrumbView.vue'
import FullScreen from '@/components/FullScreen.vue'
import Avatar from '@/components/AvatarView.vue'
</script>

<style scoped lang="less">
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center; /* 垂直居中 */
  height: 100%;
  padding: 0 24px;
}
</style>
