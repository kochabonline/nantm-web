<template>
  <div>
    <Table :loading="loading" :columns="columns" :data-source="data" :pagination="pagination">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'status'">
          <a-tag v-if="text === 'pending'" color="orange">{{ text }}</a-tag>
          <a-tag v-else-if="text === 'success'" color="green">{{ text }}</a-tag>
          <a-tag v-else-if="text === 'failed'" color="red">{{ text }}</a-tag>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Control'
})
import Table from '@/components/table/index.vue'
import { computed, reactive, ref } from 'vue'
import { useMessageStore } from '@/stores/message'
import { onBeforeMount } from 'vue'
import type { Message, MessagePaginationRequest } from '@/types/message'

const messageStore = useMessageStore()
const data = computed(() => messageStore.messages.items || [])
const columns = [
  { title: '标题', dataIndex: 'title', key: 'title', ellipsis: true },
  { title: '内容', dataIndex: 'content', key: 'content', ellipsis: true },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    filters: [
      { text: '成功', value: 'success' },
      { text: '失败 ', value: 'failed' }
    ],
    filterMultiple: false,
    onFilter: (value: string, record: Message) => record.status.indexOf(value) === 0
  },
  { title: '创建时间', key: 'created_at', dataIndex: 'created_at' },
  { title: '附加信息', key: 'payload', dataIndex: 'payload', ellipsis: true }
]
// 查询参数
const params = reactive({} as MessagePaginationRequest)
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

const fetchData = async (params: MessagePaginationRequest) => {
  try {
    loading.value = true
    await messageStore.getMessages(params)
    total.value = messageStore.messages.total
    pagination.total = total.value
    pagination.current = params.page
  } catch (error) {
    /* empty */
  } finally {
    loading.value = false
  }
}
// 组件挂载到DOM之前加载数据
onBeforeMount(async () => {
  await fetchData(params)
})
</script>

<style scoped lang="less"></style>
