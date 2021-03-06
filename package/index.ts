import type { App } from 'vue'
import {
  MessageScroll,
  SeamlessScroll,
  defineColumns,
  defineMessageScroll,
  defineSeamlessScroll,
  defineTableScroll,
} from './scroll'
export type { RowData } from './scroll'
export * from './types'

export default function install(app: App) {
  app.component('MessageScroll', MessageScroll)
  app.component('SeamlessScroll', SeamlessScroll)
}

export {
  MessageScroll,
  SeamlessScroll,
  defineSeamlessScroll,
  defineMessageScroll,
  defineTableScroll,
  defineColumns,
}
