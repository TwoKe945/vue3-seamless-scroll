/**
 * 元素接口
 */
export interface ElementSize {
  width: number
  height: number
}

/**
 * 滚动策略接口
 */
export interface ScrollStrategy {
  type: () => string
  style: (step: number) => { transform?: string; flexDirection?: string; width?: string; height?: string }
  isOverflow: (stepCount: number, size: ElementSize) => boolean
  start: (size: ElementSize) => number
}

export interface Column {
  title: string // 列名
  key: string // 列key
  width: string // 列宽度
  style?: any // 列样式
}
