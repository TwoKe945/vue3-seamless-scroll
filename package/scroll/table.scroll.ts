import type { PropType } from 'vue'
import { defineComponent, h, renderList } from 'vue'
import type { Column } from '../types'
import { SeamlessScroll, seamlessScrollProps } from './seamless.scroll'

export type RowData<Columns extends readonly Column[]> = {
  [key in Columns[number]['key']]: any
}

function mergeStyle(defaultStyle: any, style: any) {
  return {
    ...defaultStyle,
    ...style,
  }
}

/**
 *  定义列
 * @param columns
 * @returns
 */
export function defineColumns<T extends Column>(columns: readonly T[]): readonly T[] {
  return columns
}

/**
 * 表格滚动组件
 * @returns
 */
export function defineTableScroll<T>(
  columns: readonly Column[],
  formatStyle?: (key: string, value: any) => any,
  tableClass = 'table-scroll',
  headerClass = 'table-scroll-header',
  bodyClass = 'table-scroll-body',
  cellClass = 'table-scroll-cell',
  bodyRowClass = 'table-scroll-row') {
  return defineComponent({
    props: {
      ...seamlessScrollProps,
      data: {
        type: Array as PropType<T[]>,
        required: true,
      },
    },
    setup(props, ctx) {
      const defaultHeadStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        listStyle: 'none',
      }

      const defaultColumnStyle = (col: Column) => ({
        textAligin: 'center',
        width: col.width,
      })

      const defaultRowStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        cursor: 'pointer',
        listStyle: 'none',
      }

      return () => h('div', {
        class: tableClass,
      }, [
        h('ul', {
          class: headerClass,
          style: mergeStyle(defaultHeadStyle, {}),
        }, renderList(columns, col => h('li', {
          class: cellClass,
          style: mergeStyle(defaultColumnStyle(col), col.style),
        }, col.title))),
        h(SeamlessScroll, {
          ...props,
          class: bodyClass,
        },
        h('div', {},
          renderList(props.data, data => h('ul', {
            class: bodyRowClass,
            onClick: () => ctx.emit('clickItem', data),
            style: mergeStyle(defaultRowStyle, {}),
          }, renderList(columns, col => h('li', {
            class: cellClass,
            style: { ...mergeStyle(defaultColumnStyle(col), col.style), ...(formatStyle ? formatStyle(col.key, (data as any)[col.key]) : {}) },
          }, (data as any)[col.key])))),
        ),
        ),
      ])
    },
  })
}
