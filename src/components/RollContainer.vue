import type { ElementSize from '@vueuse/core';
<script setup lang="ts">

interface ScrollContainerProps {
  el: string // 绑定的滚动元素
}

const props = defineProps<ScrollContainerProps>()

// 滚动区域
const rollArea = ref<HTMLDivElement>()
// 滚动计步数
const stepCount = ref(0)
const scrolling = ref(true)
const toggleScroll = useToggle(scrolling)
const enableTransition = ref(true)
let rollTimer: any

interface ElementSize {
  width: number
  height: number
}

const rect = ref<ElementSize>({ width: 0, height: 0 })

/**
 * 检查是否超出边界
 */
const isOverflow = computed(() => Math.abs(stepCount.value) >= rect.value.width)
/**
 * 移动
 */
function move(defaultStep = 1, startStep = 0) {
  if (!scrolling.value) return
  if (isOverflow.value) {
    enableTransition.value = false
    stepCount.value = startStep
    const timer = setTimeout(() => {
      enableTransition.value = true
      clearTimeout(timer)
    }, 100)
  }
  stepCount.value += defaultStep
}

const rollContainerStyle = ref({})

/**
 * 初始化元素尺寸
 */
function initElementSize() {
  const width = document.getElementById(props.el)?.clientWidth as number
  const height = document.getElementById(props.el)?.clientHeight as number
  rect.value = { width, height }
}

const stopWatchRollArea = watch(rollArea, () => initElementSize())

const stopWatchRect = watch(rect, (value) => {
  const style = {
    width: `${value.width}px`,
    height: `${value.height}px`,
  }
  rollContainerStyle.value = {
    ...rollContainerStyle.value,
    ...style,
  }
})

onMounted(() => {
  rollTimer = setInterval(() => move(), 50)
})

onUnmounted(() => {
  if (rollTimer)
    clearInterval(rollTimer)
  stopWatchRollArea()
  stopWatchRect()
})

const style = computed(() => (enableTransition.value
  ? {
    transition: 'all 50ms',
    transform: `translateX(-${stepCount.value}px)`,
  }
  : {
    transform: `translateX(-${stepCount.value}px)`,
  }))
</script>

<template>
  <div
    ref="rollContainer" :style="rollContainerStyle" bg-red
    overflow="hidden"
    @mouseover="toggleScroll(false)"
    @mouseout="toggleScroll(true)"
  >
    <div ref="rollArea" :style="style" flex="~">
      <slot name="scrollPanel" />
      <slot name="scrollPanel" />
    </div>
  </div>
</template>
