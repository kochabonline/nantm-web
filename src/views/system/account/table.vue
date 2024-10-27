<template>
  <div>
    <Table
      :columns="columns"
      :data="userStore.users.items"
      :switch="{
        key: 'status',
        onClick: onSwitch,
        checkedValue: 1,
        unCheckedValue: 2,
        onDisabled: onDisabled
      }"
      :action="{ onDelete: Delete }"
    />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount } from 'vue'
import Table from '@/components/table/index.vue'

const userStore = useUserStore()
const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname' },
  { title: '邮箱', dataIndex: 'email', key: 'email' },
  { title: '角色', dataIndex: 'role', key: 'role' },
  { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作', key: 'action' }
]

const onSwitch = (checked: any, record: any) => {
  console.log('更新状态', checked)
  console.log('当前行数据', record)
}

const onDisabled = (record: any) => {
  // TODO: 判断当前用户是否为超级管理员
  return record.role === 'super_admin'
}

const Delete = async (record: any) => {
  const { id } = record
  await userStore.deleteUser(id)
  // 删除后重新获取用户列表
  await userStore.getUserList()
}

onBeforeMount(async () => {
  await userStore.getUserList()
})
</script>

<style scoped lang="less"></style>
