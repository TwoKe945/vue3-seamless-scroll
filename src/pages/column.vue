<script setup lang="ts">
// import { SeamlessScroll } from '~/../package/index'
import { useMutationObserver } from '@vueuse/core'
import type { Ref } from 'vue'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { getRealNumber, getStyle, useRequestAnimation } from '../../package/windows'

function initDOM(el: Ref<HTMLElement>, width: number, height: number) {
  el.value.style.width = `${width}px`
  el.value.style.height = `${height}px`
}

/**
 * 自动填充宽高
 */
function useAutoDOM(
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

interface ViewPort {
  width: number
  height: number
}

interface Container {
  width: number
  height: number
}

interface Content {
  width: number
  height: number
}

interface Context {
  viewport: Container
  content: Content
}

const context = ref<Context>({
  content: {
    width: 0,
    height: 0,
  },
  viewport: {
    width: 0,
    height: 0,
  },
})
const body = ref<HTMLElement>()
const content = ref<HTMLElement>()
const step = ref(0)

const { startAnimation, stopAnimation } = useRequestAnimation(() => {
  if (Math.abs(step.value) >= (context.value.content.height / 2))
    step.value = 0
  else
    step.value++
  content.value!.style.top = `-${step.value}px`
})

useAutoDOM(content, (el, width, height) => {
  context.value!.content = {
    width,
    height: height * 2,
  }
  el.value.style.width = `${width}px`
  el.value.style.height = `${2 * height}px`
})

useAutoDOM(body, (el, width, height) => {
  context.value!.viewport = {
    width,
    height: height / 2,
  }
  el.value.style.width = `${width}px`
  el.value.style.height = `${height / 2}px`
})

onMounted(() => {
  startAnimation()
})

onUnmounted(() => {
  stopAnimation()
})

const msgs = ref([
  '111111111',
  '111111111',
  '111111111',
  '111111111',
  '111111111',
  '111111111',
])

function change() {
  msgs.value = [...msgs.value, '222222222']
}

</script>
<template>
  <div btn @click="change">
    div
  </div>
  <div flex="~" items="center" justify="between">
    <div ref="body" class="scroll-body">
      <div ref="content" class="scroll-content">
        <ul style="width:20vw;">
          <li v-for="item in msgs" :key="item">
            {{ item }}
          </li>
        </ul>
        <ul style="width:20vw;">
          <li v-for="item in msgs" :key="item">
            {{ item }}
          </li>
        </ul>
        <!-- <ImageList w100 dir="column" /> -->
        <!-- <ImageList w100 dir="column" /> -->
      </div>
    </div>
    <!-- <SeamlessScroll
        to="top"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
  </div> -->
    <!-- <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="top"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div> -->
  </div>
</template>

<style scoped>
.scroll-body {
  position: relative;
  /* background: red; */
  overflow: hidden;
  font-size: 2vw;
  color: red;
}
.scroll-content {
  position: absolute;
  transition: all 0.5s inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
