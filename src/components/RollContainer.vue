import type { ElementSize from '@vueuse/core';
<script setup lang="ts">

const rollArea = ref<HTMLDivElement>()
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
const isOverflow = computed(() => Math.abs(stepCount.value) >= rect.value.width / 2)
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

function initElementSize() {
  const width = rollArea.value!.clientWidth as number
  const height = rollArea.value?.clientHeight as number
  rect.value = { width, height }
}

const stopWatchRollArea = watch(rollArea, (value) => {
  initElementSize()
})

const stopWatchRect = watch(rect, (value) => {
  const style = {
    width: `${value.width / 2}px`,
    height: `${value.height}px`,
  }
  rollContainerStyle.value = {
    ...rollContainerStyle.value,
    ...style,
  }
})

onMounted(async() => {
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
    <div ref="rollArea" :style="style" bg-gray-500 flex="~">
      <div v-for="i in 2" :key="i">
        <slot />
      </div>
    </div>
  </div>
</template>
