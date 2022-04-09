import type { Ref } from 'vue'
import { nextTick, onMounted, ref } from 'vue'
import { useMutationObserver } from '@vueuse/core'
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
    useMutationObserver(context, resize, {
      childList: true,
      subtree: true,
    })
  })

  function resize() {
    if (context.value) {
      const width = getStyle(context.value, 'width')
      const height = getStyle(context.value, 'height')
      fn(elRef as Ref<HTMLElement>, getRealNumber(width), getRealNumber(height))
    }
  }

  return {
    resize,
  }
}
