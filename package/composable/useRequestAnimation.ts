import { ref } from 'vue'

/* eslint-disable prefer-rest-params */
/**
 * @desc AnimationFrame简单兼容hack
 */
export const animationFrame = () => {
  window.cancelAnimationFrame = (() => {
    return (
      window.cancelAnimationFrame
      // @ts-expect-error TS2339: Property 'requestAnimationFrame' does not exist on type 'Window'.
      || window.webkitCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'mozCancelAnimationFrame' does not exist on type 'Window'.
      || window.mozCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'oCancelAnimationFrame' does not exist on type 'Window'.
      || window.oCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'msCancelAnimationFrame' does not exist on type 'Window'.
      || window.msCancelAnimationFrame
      || function(id) {
        return window.clearTimeout(id)
      }
    )
  })()
  window.requestAnimationFrame = (function() {
    return (
      window.requestAnimationFrame
      // @ts-expect-error TS2339: Property 'requestAnimationFrame' does not exist on type 'Window'.
      || window.webkitCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'mozCancelAnimationFrame' does not exist on type 'Window'.
      || window.mozCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'oCancelAnimationFrame' does not exist on type 'Window'.
      || window.oCancelAnimationFrame
      // @ts-expect-error TS2339: Property 'msCancelAnimationFrame' does not exist on type 'Window'.
      || window.msCancelAnimationFrame
      || function(callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  })()
}

/**
 * 获取内外边距的真实值（Int）
 * @param num
 * @returns
 */
export function getRealNumber(num: string | undefined) {
  return num ? parseInt(num.replace('px', '')) : 0
}

// 获取dom元素计算后的样式, 兼容IE8
export function getStyle(dom: HTMLElement, style: any) {
  if (window.getComputedStyle) { return window.getComputedStyle(dom)[style] }
  else {
    // @ts-expect-error TS2339 - getComputedStyle is not defined 兼容IE
    return dom?.currentStyle[style]
  }
}

export function useRequestAnimation(fn: () => void, enableTimeout = false, delay = 1000 / 60) {
  animationFrame()
  const framId = ref<any>(null)
  const timerId = ref<any>(null)
  const running = ref(false)

  function clearTimer() {
    if (timerId.value) {
      clearTimeout(timerId.value)
      timerId.value = null
    }
  }

  function clearAnimation() {
    if (framId.value) {
      cancelAnimationFrame(framId.value)
      framId.value = null
    }
  }

  const startAnimation = async function() {
    clearAnimation()
    framId.value = requestAnimationFrame(() => {
      fn()
      if (enableTimeout) {
        clearTimer()
        timerId.value = setTimeout(() => startAnimation(), delay)
      }
      else {
        startAnimation()
      }
    })
    running.value = true
  }

  const stopAnimation = function() {
    clearAnimation()
    if (enableTimeout)
      clearTimer()
  }

  return {
    startAnimation,
    stopAnimation,
    running,
  }
}
