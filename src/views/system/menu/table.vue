<template>
  <div>
    <Table :columns="columns" :data="data"> </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/table/index.vue'

const columns = ref([
  // Define your columns here
])

const data = ref([
  // Define your data here
])
</script>

<style scoped lang="less"></style>
