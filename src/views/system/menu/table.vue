<template>
  <div>
    <Table :columns="columns" :data-source="menuStore.treeMenu" size="small">
      <template #title>
        <Form></Form>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Table from '@/components/table/index.vue'
import Form from './form.vue'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

const columns = ref([
  { title: '标题', dataIndex: 'title', key: 'title', align: 'center' },
  { title: '图标', dataIndex: 'icon', key: 'icon', align: 'center' },
  { title: '路径', dataIndex: 'path', key: 'path', align: 'center' },
  { title: '组件', dataIndex: 'component', key: 'component', align: 'center' },
  { title: '排序', dataIndex: 'sort', key: 'sort', align: 'center' },
  { title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'center' },
  { title: '操作', key: 'action', align: 'center' }
])

const fetchData = async () => {
  await menuStore.getTreeMenu()
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style scoped lang="less"></style>
