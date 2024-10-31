<template>
  <a-layout-content style="background: #f1f3f6">
    <div :style="{ padding: '24px', background: '#f1f3f6', height: '100%', overflow: 'auto' }">
      <router-view v-slot="{ Component }">
        <keep-alive max="10" :exclude="tabsStore.getExclude">
          <component :is="Component" v-if="tabsStore.activeTab.keepalive" />
        </keep-alive>
        <component :is="Component" v-if="!tabsStore.activeTab.keepalive" />
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores/tabs'

const tabsStore = useTabsStore()
</script>

<style scoped lang="less"></style>
