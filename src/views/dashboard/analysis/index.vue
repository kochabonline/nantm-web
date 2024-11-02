<template>
  <a-card style="width: 300px">
    <h1>Hello {{ authStore.username }}</h1>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Analysis'
})
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style scoped lang="less"></style>
