<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div class="layout-header">
      <Breadcrumb />
      <Toolbar />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import Breadcrumb from './breadcrumb/index.vue'
import Toolbar from './toolbar/index.vue'
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
