<template>
  <a-table
    class="table"
    :loading="props.loading"
    :columns="props.columns"
    :data-source="props.data"
    :pagination="props.pagination"
    :scroll="props.scroll"
  >
    <template #bodyCell="{ text, record, index, column }">
      <slot name="addBodyCell" :column="column" :record="record" :text="text" :index="index" />
      <template v-if="column.key === props.copyKey">
        <span>
          {{ text }}
          <a-button type="link" :icon="props.copyIcon" @click="onCopy(text)" />
        </span>
      </template>
      <template v-if="column.key === props.actionKey">
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
   * 滚动配置
   */
  scroll: {
    type: Object,
    default: () => ({ x: 'max-content' })
  },
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
   * 复制图标
   */
  copyIcon: {
    type: Object,
    default: () => h(CopyOutlined)
  },
  /**
   * 操作key
   */
  actionKey: {
    type: String,
    default: 'action'
  },
  /**
   * 复制key
   */
  copyKey: {
    type: String
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
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useClipboard } from '@vueuse/core'

const { isSupported, copy, copied } = useClipboard()

// 复制事件
const onCopy = (text: string) => {
  if (!isSupported) {
    message.error('当前浏览器不支持复制')
    return
  }
  copy(text)
  if (copied) {
    message.success('复制成功')
  }
}
</script>

<style scoped lang="less"></style>
