<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <Header />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sider from '@/layout/sider/index.vue'
import Header from '@/layout/header/index.vue'
import Content from '@/layout/content/index.vue'
</script>

<style scoped lang="less">
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
