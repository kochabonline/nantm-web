<template>
  <div class="account">
    <Form />
    <Table />
  </div>
</template>

<script setup lang="ts">
import Table from './table.vue'
import Form from './form.vue'
</script>

<style scoped lang="less">
.account {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
