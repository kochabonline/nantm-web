<template>
  <div class="rbac">
    <Form />
    <Table />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Rbac'
})
import Form from './form.vue'
import Table from './table.vue'
</script>

<style scoped lang="less">
.rbac {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
