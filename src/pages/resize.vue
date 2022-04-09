<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { animationFrame } from '~/composables/utils'
import { useRequestAnimation } from '~/../package/windows'
animationFrame()

const dom = ref<HTMLElement>()
const step = ref(0)

const { startAnimation, stopAnimation } = useRequestAnimation(() => {
  step.value++
  dom.value!.style.transform = `translateX(${step.value}px)`
  console.log('运动', step.value)
})

onMounted(() => {
  startAnimation()
})

function start() {
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
  <div btn @click="stop">
    清除动画
  </div>
  <div btn @click="start">
    开始动画
  </div>
  <div ref="dom" transition="all 16ms ease-linear" w100 h100 bg-red />
</template>
