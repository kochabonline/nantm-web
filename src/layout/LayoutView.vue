<template>
  <a-layout style="min-height: 100vh">
    <Sider />
    <a-layout>
      <Header />
      <Content />
      <Footer />
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Sider from '@/layout/sider/SiderView.vue'
import Header from '@/layout/header/HeaderView.vue'
import Content from '@/layout/content/ContentView.vue'
import Footer from '@/layout/footer/FooterView.vue'
</script>

<style scoped lang="less">
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
