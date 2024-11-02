<template>
  <a-card>
    <div class="menu">
      <Table />
    </div>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AppMenu'
})
import Table from './table.vue'
</script>

<style scoped lang="less"></style>
