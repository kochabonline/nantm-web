import dayjs from 'dayjs'

/**
 * 时间戳转换为日期格式
 * @param timestamp 时间戳
 * @returns
 */
function formatDate(timestamp: number | string): string {
  if (typeof timestamp === 'number') {
    return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
  } else if (typeof timestamp === 'string') {
    // 将字符串转换为数字，然后处理
    const numTimestamp = parseInt(timestamp, 10)
    if (!isNaN(numTimestamp)) {
      return dayjs.unix(numTimestamp).format('YYYY-MM-DD HH:mm:ss')
    }
  }
  throw new Error('Invalid timestamp')
}

export { formatDate }
