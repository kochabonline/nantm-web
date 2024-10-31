<template>
  <div>
    <Table
      :loading="loading"
      :columns="columns"
      :data="apiStore.apis.items"
      :pagination="pagination"
      :action="{ onEdit, onDelete }"
    >
      <template #title>
        <Form></Form>
      </template>
    </Table>
    <Form :isUpdate="isUpdate" :record="updateRecord" @reset="reset" />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/table/index.vue'
import { useApiStore } from '@/stores/api'
import type { PaginationRequest } from '@/types/request'
import { message } from 'ant-design-vue'
import { onBeforeMount, reactive, ref } from 'vue'
import Form from './form.vue'

const apiStore = useApiStore()
const columns = [
  { title: '组', dataIndex: 'group', key: 'group', align: 'center' },
  { title: '名称', dataIndex: 'name', key: 'name', align: 'center' },
  { title: '路径', dataIndex: 'path', key: 'path', align: 'center' },
  { title: '请求方法', dataIndex: 'method', key: 'method', align: 'center' },
  { title: '描述', dataIndex: 'description', key: 'description', align: 'center' },
  { title: '操作', dataIndex: 'action', key: 'action', align: 'center' }
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
    await apiStore.getApis(params)
    total.value = apiStore.apis.total
    pagination.total = total.value
    pagination.current = params.page
  } catch (error) {
    /** empty */
  } finally {
    loading.value = false
  }
}

/** 编辑 */
const updateRecord = ref({})
const isUpdate = ref(false)
const onEdit = (record: any) => {
  updateRecord.value = record
  isUpdate.value = true
}
const reset = () => {
  isUpdate.value = false
  updateRecord.value = {}
}

const onDelete = async (record: any) => {
  try {
    const { id } = record
    await apiStore.deleteApi(id)
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
