<template>
  <Table :loading="loading" :columns="columns" :data="data" :pagination="pagination"></Table>
</template>

<script setup lang="ts">
import Table from '@/components/table/TableView.vue'
import type { RolePaginationRequest } from '@/types/role'
import { onBeforeMount, reactive, ref } from 'vue'

// 表格列
const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name' },
  { title: '角色描述', dataIndex: 'description', key: 'description' },
  { title: '创建时间', key: 'created_at', dataIndex: 'created_at' },
  { title: '操作', key: 'action', dataIndex: 'action' }
]
// 查询参数
const params = reactive({} as RolePaginationRequest)
// 加载状态
const loading = ref(false)
// 表格数据
const data = ref([])
// 总数
const total = ref(0)
const current = ref(1)

const pagination = reactive({
  hideOnSinglePage: true,
  total: total.value,
  pageSize: 10,
  current: current.value,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showTotal: (total: number) => `共 ${total} 条`,
  onChange: (page: number, pageSize: number) => onChange(page, pageSize),
  onShowSizeChange: (current: number, size: number) => onShowSizeChange(current, size)
})
// 页码改变
const onChange = async (page: number, pageSize: number) => {
  params.page = page
  params.size = pageSize
  await fetchData(params)
}
// 分页改变
const onShowSizeChange = async (current: number, size: number) => {
  params.page = current
  params.size = size
  pagination.pageSize = size
  await fetchData(params)
}

const fetchData = async (params: RolePaginationRequest) => {
  loading.value = true
  pagination.total = total.value
  pagination.current = params.page
  loading.value = false
}
// 组件挂载到DOM之前加载数据
onBeforeMount(async () => {
  await fetchData(params)
})
</script>

<style scoped lang="less"></style>
