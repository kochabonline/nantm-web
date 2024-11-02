<template>
  <a-card>
    <div class="role">
      <Form />
      <Table />
    </div>
  </a-card>
</template>

<script setup lang="ts" name="Role">
import Form from './form.vue'
import Table from './table.vue'

defineOptions({
  name: 'Role'
})
</script>

<style scoped lang="less">
.role {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
