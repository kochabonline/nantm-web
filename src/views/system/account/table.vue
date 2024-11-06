<template>
  <div>
    <Table
      :columns="columns"
      :data-source="userStore.users.items"
      :switch="{
        key: 'status',
        onClick: onSwitch,
        checkedValue: 1,
        unCheckedValue: 2,
        onDisabled: onDisabled
      }"
      :action="{ onEdit: onEdit, onDelete: onDelete }"
    />
    <Form :isUpdate="isUpdate" :record="updateRecord" @reset="reset" />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onBeforeMount, ref } from 'vue'
import Table from '@/components/table/index.vue'
import Form from './form.vue'
import type { FormInstance } from 'ant-design-vue'

const userStore = useUserStore()
const columns = [
  { title: '用户名', dataIndex: 'username', key: 'username', align: 'center' },
  { title: '昵称', dataIndex: 'nickname', key: 'nickname', align: 'center' },
  { title: '邮箱', dataIndex: 'email', key: 'email', align: 'center' },
  { title: '角色', dataIndex: 'role', key: 'role', align: 'center' },
  { title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'center' },
  { title: '状态', dataIndex: 'status', key: 'status', align: 'center' },
  { title: '操作', key: 'action', align: 'center' }
]

const onSwitch = (checked: any, record: any) => {
  console.log('更新状态', checked)
  console.log('当前行数据', record)
}

const onDisabled = (record: any) => {
  // TODO: 判断当前用户是否为超级管理员
  return record.role === 'super_admin'
}

// 编辑
const isUpdate = ref(false)
const updateRecord = ref({})
const onEdit = (record: any) => {
  isUpdate.value = true
  updateRecord.value = record
}
const reset = () => {
  isUpdate.value = false
  updateRecord.value = {}
}

const onDelete = async (record: any) => {
  const { id } = record
  await userStore.deleteUser(id)
  // 删除后重新获取用户列表
  await userStore.getUsers()
}

onBeforeMount(async () => {
  await userStore.getUsers()
})
</script>

<style scoped lang="less"></style>
