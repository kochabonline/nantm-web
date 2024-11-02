<template>
  <a-card>
    <div class="account">
      <Form />
      <Table />
    </div>
  </a-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Account'
})
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
