<template>
  <div :class="scroll.class">
    <a-table
      :loading="props.loading"
      :columns="props.columns"
      :data-source="props.data"
      :pagination="pagination"
      :scroll="localScroll"
      :size="props.size"
    >
      <template #bodyCell="{ text, record, index, column }">
        <slot name="addBodyCell" :column="column" :record="record" :text="text" :index="index" />
        <template v-if="clipboard.keys.includes(column.key)">
          <div class="table-clipboard">
            {{ text }}
            <a-button
              class="table-clipboard-button"
              :type="clipboard.button.type"
              :icon="clipboard.button.icon"
              @click="onCopy(text)"
            />
          </div>
        </template>
        <template v-else-if="ellipsis.keys.includes(column.key)">
          <span>
            <a-tooltip
              v-if="ellipsis.show && text.length > ellipsis.maxWidth"
              :title="text"
              :placement="ellipsis.tooltip.placement"
              :color="ellipsis.color"
            >
              <span>{{ text.slice(0, ellipsis.maxWidth) }}...</span>
            </a-tooltip>
            <span v-else>{{ text }}</span>
          </span>
        </template>
        <template v-else-if="localSwitch.key == column.key">
          <span>
            <a-switch
              v-model:checked="record[column.key]"
              :disabled="
                localSwitch.onDisabled(record) ? !localSwitch.disabled : localSwitch.disabled
              "
              :loading="localSwitch.loading"
              :size="localSwitch.size"
              :checked-children="localSwitch.checkedChildren"
              :un-checked-children="localSwitch.unCheckedChildren"
              :checked-value="localSwitch.checkedValue"
              :un-checked-value="localSwitch.unCheckedValue"
              @change="localSwitch.onChange"
              @click="localSwitch.onClick"
            />
            <a-divider type="vertical" />
          </span>
        </template>
        <template v-else-if="column.key === action.key">
          <span>
            <a-tooltip
              :title="action.edit.tooltip.title"
              :placement="action.edit.tooltip.placement"
              @click="action.onEdit(record)"
            >
              <a-button :type="action.edit.button.type" :icon="action.edit.button.icon" />
            </a-tooltip>
            <a-divider type="vertical" />
            <a-popconfirm
              :title="action.delete.popconfirm.title"
              @confirm="action.onDelete(record)"
            >
              <a-tooltip
                :title="action.delete.tooltip.title"
                :placement="action.delete.tooltip.placement"
              >
                <a-button
                  :type="action.delete.button.type"
                  :icon="action.delete.button.icon"
                  :danger="action.delete.button.danger"
                />
              </a-tooltip>
            </a-popconfirm>
            <a-divider type="vertical" />
          </span>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, reactive, ref, watch, type PropType } from 'vue'
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useClipboard } from '@vueuse/core'
import { calculateTableHeight } from '@/utils/table'
import type { Clipboard, Ellipsis, Switch, Action, Pagination, Scroll } from './type'

const props = defineProps({
  /**
   * 滚动
   */
  scroll: {
    type: Object as PropType<Partial<Scroll>>,
    default: () => ({})
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
   * 大小
   */
  size: {
    type: String,
    default: 'large'
  },
  /**
   * 剪切板
   */
  clipboard: {
    type: Object as PropType<Partial<Clipboard>>,
    default: () => ({})
  },
  /**
   * 省略号
   */
  ellipsis: {
    type: Object as PropType<Partial<Ellipsis>>,
    default: () => ({})
  },
  /**
   * 开关
   */
  switch: {
    type: Object as PropType<Partial<Switch>>,
    default: () => ({})
  },
  /**
   * 操作
   */
  action: {
    type: Object as PropType<Partial<Action>>,
    default: () => ({})
  },
  /**
   * 分页
   */
  pagination: {
    type: Object as PropType<Partial<Pagination>>,
    default: () => ({})
  }
})

/**
 * 剪切板
 */
const defaultClipboard = reactive<Clipboard>({
  keys: [''],
  button: {
    type: 'link',
    icon: h(CopyOutlined)
  },
  message: {
    success: '复制成功',
    notSupported: '当前浏览器不支持复制'
  }
})
// 子组件传递的 clipboard 与 defaultClipboard 合并
const clipboard = computed(() => ({ ...defaultClipboard, ...props.clipboard }))

const { isSupported, copy, copied } = useClipboard()
// 复制事件
const onCopy = (text: string) => {
  if (!isSupported) {
    message.error(clipboard.value.message.notSupported)
    return
  }
  copy(text)
  if (copied) {
    message.success(clipboard.value.message.success)
  }
}

/**
 * 省略号
 */
const defaultEllipsis = reactive<Ellipsis>({
  keys: [''],
  show: true,
  maxWidth: 48,
  tooltip: {
    placement: 'bottom'
  },
  color: ''
})
// 子组件传递的 ellipsis 与 defaultEllipsis 合并
const ellipsis = computed(() => ({ ...defaultEllipsis, ...props.ellipsis }))

/**
 * 开关
 */
const defaultSwitch = reactive<Switch>({
  key: '',
  disabled: false,
  loading: false,
  size: 'default',
  checkedChildren: '开启',
  unCheckedChildren: '禁用',
  checkedValue: true,
  unCheckedValue: false,
  onChange: () => {},
  onClick: () => {},
  onDisabled: () => false
})
// 子组件传递的 switch 与 defaultSwitch 合并
const localSwitch = computed(() => ({ ...defaultSwitch, ...props.switch }))

/**
 * 操作
 */
const defaultAction = reactive<Action>({
  key: 'action',
  onEdit: () => {},
  onDelete: () => {},
  edit: {
    tooltip: {
      title: '编辑',
      placement: 'bottom'
    },
    button: {
      type: 'link',
      icon: h(EditOutlined)
    }
  },
  delete: {
    tooltip: {
      title: '删除',
      placement: 'bottom'
    },
    popconfirm: {
      title: '是否确定删除?'
    },
    button: {
      type: 'link',
      danger: true,
      icon: h(DeleteOutlined)
    }
  }
})
// 子组件传递的 action 与 defaultAction 合并
const action = computed(() => ({ ...defaultAction, ...props.action }))

/**
 * 分页
 */
const defaultPagination = reactive({
  disabled: false,
  hideOnSinglePage: true,
  total: 0,
  pageSize: 10,
  current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showTotal: (total: number) => `共 ${total} 条`,
  onChange: () => {},
  onShowSizeChange: () => {}
})
// 子组件传递的 pagination 与 defaultPagination 合并
const pagination = computed(() => ({ ...defaultPagination, ...props.pagination }))

/**
 * 表格滚动样式
 */
const defaultScroll = reactive({
  class: 'table'
})
// 子组件传递的 scroll 与 defaultScroll 合并
const scroll = computed(() => ({ ...defaultScroll, ...props.scroll }))

/**
 * 表格滚动配置, y轴高度自适应, 必须在挂载后计算表格高度
 */
const localScroll = ref({ x: 'max-content', y: 0 })
// 组件挂载到DOM之后计算表格高度
onMounted(() => {
  localScroll.value.y = calculateTableHeight(true)
})
// 监听表格数据变化, 动态计算表格高度
watch(
  () => props.data,
  () => {
    if (pagination.value.total > pagination.value.pageSize) {
      localScroll.value.y = calculateTableHeight(true)
    } else {
      localScroll.value.y = calculateTableHeight(false)
    }
  }
)
</script>

<style scoped lang="less">
// 表格高度未超出屏幕时，隐藏滚动条
:deep(.ant-table-body, .ant-table-header) {
  overflow-y: auto !important;
}

// 表格剪切板样式
.table-clipboard {
  position: relative;
  display: inline-block;
  padding-right: 40px; /* 固定间距 */
}
.table-clipboard-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>
