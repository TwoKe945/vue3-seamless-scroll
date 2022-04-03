<script setup lang="ts">
import type { StyleValue } from 'vue'

interface ScrollContainerProps {
  el: string // 绑定的滚动元素
  to?: 'top' | 'left' | 'right' | 'bottom' // 滚动的方向
  duration?: number // 滚动的时间
  dishover?: boolean // 是否悬停
}

const props = withDefaults(defineProps<ScrollContainerProps>(), {
  to: 'top',
  duration: 50,
  dishover: true,
})

// 滚动区域
const rollArea = ref<HTMLDivElement>()
// 滚动计步数
const stepCount = ref()
const scrolling = ref(true)
const toggleScroll = useToggle(scrolling)
const enableTransition = ref(true)
let rollTimer: any

interface ElementSize {
  width: number
  height: number
}

const rect = ref<ElementSize>({ width: 0, height: 0 })

interface Strategy {
  style: (step: number) => { transform: string; flexDirection: string }
  isOverflow: (stepCount: number, size: ElementSize) => boolean
  start: (size: ElementSize) => number
}

const strategyFactory = {
  top: {
    style: step => ({
      transform: `translateY(-${step}px)`,
      flexDirection: 'column',
    }),
    isOverflow: (stepCount, size) => Math.abs(stepCount) >= size.height,
    start: () => 0,
  } as Strategy,
  bottom: {
    style: step => ({
      transform: `translateY(${step}px)`,
      flexDirection: 'column',
    }),
    isOverflow: stepCount => Math.abs(stepCount) <= 0,
    start: size => -size.height,
  } as Strategy,
  left: {
    style: step => ({
      transform: `translateX(-${step}px)`,
      flexDirection: 'row',
    }),
    isOverflow: (stepCount, size) => Math.abs(stepCount) >= size.width,
    start: () => 0,
  } as Strategy,
  right: {
    style: step => ({
      transform: `translateX(${step}px)`,
      flexDirection: 'row',
    }),
    isOverflow: stepCount => Math.abs(stepCount) <= 0,
    start: size => -size.width,
  } as Strategy,
}

const strategy = strategyFactory[props.to]

/**
 * 检查是否超出边界
 */
const isOverflow = computed(() => strategy.isOverflow(stepCount.value, rect.value))
/**
 * 移动
 */
function move(startStep = 0) {
  if (!scrolling.value) return
  if (isOverflow.value) {
    enableTransition.value = false
    stepCount.value = startStep
    const timer = setTimeout(() => {
      enableTransition.value = true
      clearTimeout(timer)
    }, 100)
  }
  stepCount.value += 1
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
  stepCount.value = strategy.start(rect.value)
  rollTimer = setInterval(() => move(strategy.start(rect.value)), props.duration)
})

onUnmounted(() => {
  if (rollTimer)
    clearInterval(rollTimer)
  stopWatchRollArea()
  stopWatchRect()
})

const style = computed(() => (enableTransition.value
  ? {
    transition: `all ${props.duration}ms`,
    display: 'flex',
    ...strategy.style(stepCount.value),
  } as StyleValue
  : {
    display: 'flex',
    ...strategy.style(stepCount.value),
  } as StyleValue))
</script>

<template>
  <div
    ref="rollContainer" :style="rollContainerStyle" bg-red
    overflow="hidden"
    @mouseover="props.dishover && toggleScroll(false)"
    @mouseout="props.dishover && toggleScroll(true)"
  >
    <div ref="rollArea" :style="style">
      <slot name="scrollPanel" />
      <slot name="scrollPanel" />
    </div>
  </div>
</template>
