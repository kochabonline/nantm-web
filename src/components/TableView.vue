<template>
  <a-table
    :loading="props.loading"
    :columns="props.columns"
    :data-source="props.data"
    :pagination="props.pagination"
  >
    <template #bodyCell="{ text, record, index, column }">
      <slot name="addBodyCell" :column="column" :record="record" :text="text" :index="index" />
      <template v-if="column.key === 'action' && record">
        <span>
          <a-tooltip title="编辑" placement="bottom" :onclick="props.onEdit(record)">
            <a-button type="primary" ghost :icon="props.editIcon" />
          </a-tooltip>
          <a-divider type="vertical" />
          <a-popconfirm title="是否确定删除?" @confirm="props.onDelete(record)">
            <a-tooltip title="删除" placement="bottom">
              <a-button danger :icon="props.deleteIcon" />
            </a-tooltip>
          </a-popconfirm>
          <a-divider type="vertical" />
        </span>
      </template>
    </template>
  </a-table>
</template>

<script setup lang="ts">
const props = defineProps({
  /**
   * 加载状态
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 表格列
   */
  columns: {
    type: Array,
    required: true
  },
  /**
   * 表格数据
   */
  data: {
    type: Array,
    required: true
  },
  /**
   * 编辑事件
   */
  onEdit: {
    type: Function,
    default: () => {}
  },
  /**
   * 删除事件
   */
  onDelete: {
    type: Function,
    default: () => {}
  },
  /**
   * 编辑图标
   */
  editIcon: {
    type: Object,
    default: () => h(EditOutlined)
  },
  /**
   * 删除图标
   */
  deleteIcon: {
    type: Object,
    default: () => h(DeleteOutlined)
  },
  /**
   * 数据总量
   */
  total: {
    type: Number,
    default: 0
  },
  /**
   * 分页配置
   */
  pagination: {
    type: Object,
    default: () => ({
      disabled: false,
      hideOnSinglePage: true,
      total: 0,
      pageSize: 10,
      current: 1,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50', '100'],
      showTotal: (total: number) => `共 ${total} 条`,
      onChange: () => {},
      onShowSizeChange: () => {}
    })
  }
})
import { h } from 'vue'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
</script>

<style scoped lang="less"></style>
