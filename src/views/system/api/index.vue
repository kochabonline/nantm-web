<template>
  <div class="api">
    <Form />
    <Table />
  </div>
</template>

<script setup lang="ts">
import Form from './form.vue'
import Table from './table.vue'
</script>

<style scoped lang="less">
.api {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
