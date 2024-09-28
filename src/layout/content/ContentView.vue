<template>
  <a-layout-content style="margin: 16px 16px">
    <div :style="{ padding: '24px', background: '#fff', height: '100%' }">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </a-layout-content>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
