<template>
  <div>
    <Table :columns="columns" :data="data"> </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/table/index.vue'

const columns = ref([
    { title: '菜单名称', dataIndex: 'name', key: 'name' },
    { title: '图标', dataIndex: 'icon', key: 'icon' },
    { title: '路径', dataIndex: 'path', key: 'path' },
    { title: '组件', dataIndex: 'component', key: 'component' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at' },
    { title: '操作', key: 'action' }
])

const data = ref([
  // Define your data here
])
</script>

<style scoped lang="less"></style>
