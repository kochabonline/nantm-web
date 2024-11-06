<template>
  <div>
    <Table
      :loading="loading"
      :columns="columns"
      :data-source="roleStore.roles.items"
      :action="{ onDelete: onDelete }"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/table/index.vue'
import { useRoleStore } from '@/stores/role'
import type { PaginationRequest } from '@/types/request'
import { message } from 'ant-design-vue'
import { onBeforeMount, reactive, ref } from 'vue'

const roleStore = useRoleStore()
// 表格列
const columns = [
  { title: '角色名称', dataIndex: 'name', key: 'name', align: 'center' },
  { title: '状态', key: 'status', dataIndex: 'status', align: 'center' },
  { title: '创建时间', key: 'created_at', dataIndex: 'created_at', align: 'center' },
  { title: '描述', key: 'description', dataIndex: 'description', align: 'center' },
  { title: '操作', key: 'action', dataIndex: 'action', align: 'center' }
]

// 查询参数
const params = reactive({} as PaginationRequest)
// 加载状态
const loading = ref(false)
// 总数
const total = ref(0)
const current = ref(1)

const pagination = reactive({
  total: total.value,
  pageSize: 10,
  current: current.value,
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

const fetchData = async (params: PaginationRequest) => {
  try {
    loading.value = true
    await roleStore.getRoles(params)
    total.value = roleStore.roles.total
    pagination.total = total.value
    pagination.current = params.page
  } catch (error) {
    /** empty */
  } finally {
    loading.value = false
  }
}

const onDelete = async (record: any) => {
  try {
    const { id } = record
    await roleStore.deleteRole(id)
    await fetchData(params)
  } catch (error) {
    message.error('删除失败')
  }
}

// 组件挂载到DOM之前加载数据
onBeforeMount(async () => {
  await fetchData(params)
})
</script>

<style scoped lang="less"></style>
