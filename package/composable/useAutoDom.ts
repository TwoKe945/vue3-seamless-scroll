import type { Ref } from 'vue'
import { nextTick, onMounted, ref } from 'vue'
import { useResizeObserver } from '@vueuse/core'
import { getRealNumber, getStyle } from './useRequestAnimation'

function initDOM(el: Ref<HTMLElement>, width: number, height: number) {
  el.value.style.width = `${width}px`
  el.value.style.height = `${height}px`
}

/**
 * 自动填充宽高
 */
export function useAutoDOM(
  elRef: Ref<HTMLElement | undefined>,
  fn: (el: Ref<HTMLElement>, width: number, height: number) => void = initDOM) {
  const context = ref<HTMLElement>()
  onMounted(async() => {
    await nextTick()
    const el = elRef.value
    context.value = el?.children[0] as HTMLElement
    resize()
    useResizeObserver(context, resize)
  })

  function resize() {
    if (context.value) {
      const width = getStyle(context.value, 'width')
      const pl = getStyle(context.value, 'padding-left')
      const bl = getStyle(context.value, 'border-left')
      const pr = getStyle(context.value, 'padding-right')
      const br = getStyle(context.value, 'border-right')
      const pt = getStyle(context.value, 'padding-top')
      const bt = getStyle(context.value, 'border-top')
      const pb = getStyle(context.value, 'padding-bottom')
      const bb = getStyle(context.value, 'border-bottom')
      const height = getStyle(context.value, 'height')
      fn(elRef as Ref<HTMLElement>, getRealNumber(width) + getRealNumber(pl) + getRealNumber(pr) + getRealNumber(bl) + getRealNumber(br), getRealNumber(height) + getRealNumber(pt) + getRealNumber(pb) + getRealNumber(bt) + getRealNumber(bb))
    }
  }

  return {
    resize,
  }
}
