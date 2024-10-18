<template>
  <div class="account">
    <AccountForm></AccountForm>
    <Account></Account>
  </div>
</template>

<script setup lang="ts">
import Account from './account.vue'
import AccountForm from './accountForm.vue'
</script>

<style scoped lang="less">
.account {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
