/**
 * 获取表格上方的高度
 * @param selector 选择器
 * @returns 表格上方的高度
 */
function getTableAbove(selector: string): number {
  const element = document.querySelector(selector)
  return element ? (element as HTMLElement).offsetTop : 0
}

/**
 * 计算表格的高度
 * @returns 表格的高度
 * @param calTablePaginationHeight 是否计算分页的高度, 当table总数小与每页显示的数量时, 不计算分页的高度
 */
function calculateTableHeight(calTablePaginationHeight: boolean): number {
  const windowHeight = window.innerHeight
  // 表以上的高度
  const tableAboveHeight = getTableAbove('.table')
  // 表头的高度
  const tableHeaderHeight = 77
  // 分页的高度
  const tablePaginationHeight = 64
  // padding
  const padding = 24

  // 计算表格的高度
  // 不计算分页的高度
  if (!calTablePaginationHeight) {
    return windowHeight - tableAboveHeight - tableHeaderHeight - padding
  }
  // 计算分页的高度
  return windowHeight - tableAboveHeight - tableHeaderHeight - tablePaginationHeight - padding
}

export { calculateTableHeight }
