<template>
  <div>
    <Table
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :action="{ onDelete: onDelete }"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/table/index.vue'
import { reactive, ref } from 'vue'

const loading = ref(false)
const data = ref([])
const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '路径', dataIndex: 'path', key: 'path' },
  { title: '请求方法', dataIndex: 'method', key: 'method' }
]

const pagination = reactive({
  total: 0,
  pageSize: 10,
  current: 1,
  onChange: (page: number, pageSize: number) => onChange(page, pageSize),
  onShowSizeChange: (current: number, size: number) => onShowSizeChange(current, size)
})

const onChange = async (page: number, pageSize: number) => {
  console.log(page, pageSize)
}

const onShowSizeChange = async (current: number, size: number) => {
  console.log(current, size)
}

const onDelete = (record: any) => {
  console.log(record)
}
</script>

<style scoped lang="less"></style>
