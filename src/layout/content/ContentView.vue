<template>
  <a-layout-content style="height: 849px; background: #f1f3f6">
    <div :style="{ padding: '24px', background: '#f1f3f6', height: '100%', overflow: 'auto' }">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
