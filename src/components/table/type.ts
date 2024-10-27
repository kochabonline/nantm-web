import type { Component } from 'vue'

/**
 * 剪切板
 */
interface Clipboard {
  /**
   * 剪切板的key
   */
  keys: Array<string>
  /**
   * 按钮
   */
  button: {
    /**
     * 类型
     */
    type: string
    /**
     * 图标
     */
    icon: Component
  }
  /**
   * 复制提示信息
   */
  message: {
    /**
     * 复制成功
     */
    success: string
    /**
     * 浏览器不支持
     */
    notSupported: string
  }
}

/**
 * 省略号
 */
interface Ellipsis {
  /**
   * 省略号的key
   */
  keys: Array<string>
  /**
   * 是否展示省略号
   */
  show: boolean
  /**
   * 最大宽度
   */
  maxWidth: number
  /**
   * 提示信息
   */
  tooltip: {
    /**
     * 位置
     */
    placement: string
  }
  /**
   * 颜色
   */
  color: string
}

/**
 * 开关
 */
interface Switch {
  /**
   * 开关的key
   */
  key: string
  /**
   * 是否禁用
   */
  disabled: boolean
  /**
   * 加载中的开关
   */
  loading: boolean
  /**
   * 开关的尺寸
   */
  size: string
  /**
   * 选中时的内容
   */
  checkedChildren: string
  /**
   * 非选中时的内容
   */
  unCheckedChildren: string
  /**
   * 选中时的值
   */
  checkedValue: boolean | string | number
  /**
   * 非选中时的值
   */
  unCheckedValue: boolean | string | number
  /**
   * 开关改变时的回调
   */
  onChange: (checked: boolean | string | number, record: Record<string, any>) => void
  /**
   * 点击时回调函数
   */
  onClick: (checked: boolean | string | number, record: Record<string, any>) => void
  /**
   * 禁用的开关, 返回true则禁用
   */
  onDisabled: (record: Record<string, any>) => boolean
}

/**
 * 操作
 */
interface Action {
  /**
   * 操作列的key
   */
  key: string
  /**
   * 编辑事件
   */
  onEdit: (record: Record<string, any>) => void
  /**
   * 删除事件
   * @param record 当前行数据
   */
  onDelete: (record: Record<string, any>) => void
  /**
   * 编辑
   */
  edit: {
    /**
     * 提示信息
     */
    tooltip: {
      /**
       * 标题
       */
      title: string
      /**
       * 位置
       */
      placement: string
    }
    /**
     * 按钮
     */
    button: {
      /**
       * 类型
       */
      type: string
      /**
       * 图标
       */
      icon: Component
    }
  }
  /**
   * 删除
   */
  delete: {
    /**
     * 提示信息
     */
    tooltip: {
      /**
       * 标题
       */
      title: string
      /**
       * 位置
       */
      placement: string
    }
    /**
     * 确认提示
     */
    popconfirm: {
      /**
       * 标题
       */
      title: string
    }
    /**
     * 按钮
     */
    button: {
      /**
       * 类型
       */
      type: string
      /**
       * 是否危险
       */
      danger: boolean
      /**
       * 图标
       */
      icon: Component
    }
  }
}

/**
 * 滚动
 */
interface Scroll {
  /**
   * 样式类名
   */
  class: string
}

/**
 * 分页
 */
interface Pagination {
  /**
   * 是否禁用
   */
  disabled: boolean
  /**
   * 只有一页时是否隐藏
   */
  hideOnSinglePage: boolean
  /**
   * 总数
   */
  total: number
  /**
   * 每页条数
   */
  pageSize: number
  /**
   * 当前页数
   */
  current: number
  /**
   * 是否展示 pageSize 切换器，当 total 大于 50 时默认为 true
   */
  showSizeChanger: boolean
  /**
   * 是否显示每页条数
   */
  showQuickJumper: boolean
  /**
   * 每页条数选项
   */
  pageSizeOptions: string[]
  /**
   * 总数展示
   */
  showTotal: (total: number) => string
  /**
   * 页码改变的回调
   */
  onChange: (page: number, pageSize: number) => void
  /**
   * pageSize 变化的回调
   */
  onShowSizeChange: (current: number, size: number) => void
}

export type { Clipboard, Ellipsis, Switch, Action, Scroll, Pagination }
