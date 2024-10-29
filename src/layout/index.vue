<template>
  <a-layout style="min-height: 100vh">
    <Sider :collapsed="collapsed" />
    <a-layout>
      <Header :collapsed="collapsed" @onCollapsed="onCollapsed" />
      <Content />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sider from '@/layout/sider/index.vue'
import Header from '@/layout/header/index.vue'
import Content from '@/layout/content/index.vue'
import { ref } from 'vue'

const collapsed = ref<boolean>(false)

const onCollapsed = () => {
  collapsed.value = !collapsed.value
}
</script>

<style scoped lang="less">
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
