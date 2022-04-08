import type { App } from 'vue';
import type { RowData } from './scroll-core';
import { Column, MessageScroll, SeamlessScroll, defineColumns, defineTableScroll } from './scroll-core';
export * from './exception';
export type { RowData };
export default function install(app: App): void;
export { MessageScroll, SeamlessScroll, defineColumns, defineTableScroll, Column, };
