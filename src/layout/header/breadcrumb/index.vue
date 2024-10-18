<template>
  <a-breadcrumb class="layout-breadcrumb">
    <template #separator><span>></span></template>
    <template v-for="(item, index) in route.matched" :key="item.path">
      <!-- 路由本身不可点击 -->
      <a-breadcrumb-item v-if="isLastComponent(index)">
        <span>{{ item.meta.title }}</span>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-else>
        <router-link :to="item.path">
          <span>{{ item.meta.title }}</span>
        </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isLastComponent = (index: number) => {
  return index === route.matched.length - 1
}
</script>

<style scoped lang="less"></style>
