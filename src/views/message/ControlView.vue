<template>
  <div>
    <a-table :columns="columns" :data-source="messageStore.messagesData">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'status'">
          <a-tag v-if="text === 'pending'" color="orange">{{ text }}</a-tag>
          <a-tag v-else-if="text === 'success'" color="green">{{ text }}</a-tag>
          <a-tag v-else-if="text === 'failed'" color="red">{{ text }}</a-tag>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { onBeforeMount } from 'vue'

const messageStore = useMessageStore()
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at'
  }
]

onBeforeMount(async () => {
  await messageStore.getMessages()
})
</script>

<style scoped lang="less"></style>
