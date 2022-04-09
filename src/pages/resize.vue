<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { animationFrame } from '~/composables/utils'
import { useRequestAnimation } from '~/../package/composable'
animationFrame()

const dom = ref<HTMLElement>()
const step = ref(0)

const { startAnimation, stopAnimation } = useRequestAnimation(() => {
  if (step.value >= window.screen.width)
    step.value = 0

  step.value++
  dom.value!.style.transform = `translateX(${step.value}px)`
})

onMounted(() => {
  startAnimation()
})

function start() {
  startAnimation()
}

function restart() {
  step.value = 0
  startAnimation()
}
function stop() {
  stopAnimation()
}

onUnmounted(() => {
  stopAnimation()
})

</script>

<template>
  <div
    w100
    m2
    flex="~ gap-2"
  >
    <div btn @click="restart">
      重置
    </div>
    <div btn @click="stop">
      清除动画
    </div>
    <div btn @click="start">
      开始动画
    </div>
  </div>
  <div ref="dom" transition="all 16ms ease-linear" w100 h100 bg-red />
</template>
