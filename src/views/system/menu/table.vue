<template>
  <div>
    <Table :columns="columns" :data="data">
      <template #title>
        <Form></Form>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Table from '@/components/table/index.vue'
import Form from './form.vue'

const columns = ref([
    { title: '菜单名称', dataIndex: 'name', key: 'name', align: 'center'  },
    { title: '图标', dataIndex: 'icon', key: 'icon', align: 'center'  },
    { title: '路径', dataIndex: 'path', key: 'path', align: 'center'  },
    { title: '组件', dataIndex: 'component', key: 'component', align: 'center'  },
    { title: '排序', dataIndex: 'sort', key: 'sort', align: 'center'  },
    { title: '创建时间', dataIndex: 'created_at', key: 'created_at', align: 'center'  },
    { title: '操作', key: 'action', align: 'center'  }
])

const data = ref([
  // Define your data here
])
</script>

<style scoped lang="less"></style>
