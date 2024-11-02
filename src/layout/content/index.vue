<template>
  <a-layout-content style="background: #f1f3f6">
    <div :style="{ padding: '24px', background: '#f1f3f6', height: '100%', overflow: 'auto' }">
      <router-view v-slot="{ Component }">
        <keep-alive max="10" :include="tabsStore.include" :exclude="tabsStore.exclude">
          <component :is="Component" :key="$route.name" />
        </keep-alive>
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'

const tabsStore = useTabsStore()
</script>

<style scoped lang="less"></style>
