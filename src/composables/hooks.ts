
import type { Ref } from 'vue'
import { computed, isRef, nextTick, onMounted, ref } from 'vue'
import { useEventListener, useWindowSize } from '@vueuse/core'

/**
 * 窗口变化比例
 */
export function useResizeRatio(standardWidth?: number, standardHeight?: number) {
  // 获取标准宽高
  const screenWidth = standardWidth || window.screen.width
  const screenHeight = standardHeight || window.screen.height
  // 获取浏览器可视化宽高
  const { width, height } = useWindowSize()
  // 计算比例
  const widthRatio = computed(() => width.value / screenWidth)
  const heightRatio = computed(() => height.value / screenHeight)
  return {
    widthRatio,
    heightRatio,
  }
}

/**
 * 自动调整元素大小
 */
export function useAutoResize<T extends HTMLElement>(el: T | Ref<T | undefined>, standardWidth?: number, standardHeight?: number) {
  const dom = ref<T>()
  const dw = ref(0)
  const dh = ref(0)

  onMounted(async() => {
    await nextTick()
    if (isRef(el))
      dom.value = el.value
    else
      dom.value = el
    dw.value = dom.value!.offsetWidth
    dh.value = dom.value!.offsetHeight
  })

  useEventListener(window, 'resize', () => {
    // 获取浏览器可视化宽高比
    const { widthRatio, heightRatio } = useResizeRatio(standardWidth, standardHeight)
    dom.value!.style.width = `${widthRatio.value * dw.value}px`
    dom.value!.style.height = `${heightRatio.value * dh.value}px`
  })
}
