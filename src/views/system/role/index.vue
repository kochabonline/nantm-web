<template>
  <div class="role">
    <RoleView />
  </div>
</template>

<script setup lang="ts">
import RoleView from './role.vue'
</script>

<style scoped lang="less">
.role {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
