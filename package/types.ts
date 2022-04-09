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
  contentHeight: (size: ElementSize, input: string) => string
  contentWidth: (size: ElementSize, input: string) => string
  overContent: (size: ElementSize, viewport: ElementSize) => boolean
}

export interface Column {
  title: string // 列名
  key: string // 列key
  width: string // 列宽度
  style?: any // 列样式
}

/**
 * 可视区域大小
 */
export interface ViewPort {
  width: string
  height: string
}

/**
 * 滚动的容器数据
 */
export interface Container {
  el: HTMLDivElement // 滚动容器的dom元素
  width: number
  height: number
}

/**
 * 滚动的内容数据
 */
export interface Content {
  el: HTMLDivElement // 滚动内容的dom元素
  width: number
  height: number
}

/**
 * 滚动组件的全局上下文
 */
export interface Context {
  container: Container
  content: Content
  viewport: ViewPort // 可视区域
}
