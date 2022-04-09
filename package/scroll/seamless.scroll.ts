import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ElementSize } from '../types'
import { Assert } from '../assert'
import { SCROLL_STRATEGY } from '../strategy'
import { animationFrame, useRequestAnimation } from '../windows'

export const seamlessScrollProps = {
  to: { // 滚动方向
    type: String as PropType<'top' | 'left' | 'bottom' | 'right'>,
    default: 'top',
  },
  duration: { // 动画时间帧数 1 秒 60 次
    type: Number,
    default: 17,
  },
  dishover: { // 是否启用悬停
    type: Boolean,
    default: true,
  },
  width: { // 可视窗口宽度
    type: String,
  },
  height: { // 可视窗口高度
    type: String,
  },
  sleep: { // 滚动间隔
    type: Number,
    default: 500,
  },
  enable: { // 是否启用滚动
    type: Boolean,
    default: true,
  },
}

export type SeamlessScrollProps = ExtractPropTypes<typeof seamlessScrollProps>

export function defineSeamlessScroll() {
  return defineComponent({
    props: seamlessScrollProps,
    setup(props, ctx) {
      animationFrame()
      // 滚动区域
      const rollArea = ref<HTMLDivElement>()
      // 滚动计步数
      const stepCount = ref()
      const scrolling = ref(true)
      const toggleScroll = function(flag: boolean) {
        scrolling.value = flag
      }
      // 初始化
      toggleScroll(props.enable)
      const enableTransition = ref(true)
      // 滚动区域大小
      const rect = ref<ElementSize>({ width: 0, height: 0 })

      const strategy = SCROLL_STRATEGY.get(props.to)

      const { startAnimation, stopAnimation } = useRequestAnimation(() => {
        move(strategy!.start(rect.value))
      })
      /**
       * 检查是否超出边界
       */
      const isOverflow = computed(() => strategy!.isOverflow(stepCount.value, rect.value))
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
          }, props.sleep)
        }
        stepCount.value += 1
      }

      const rollContainerStyle = ref({})

      /**
       * 初始化元素尺寸
       */
      function initElementSize() {
        const dom = rollArea.value?.children[0] as HTMLElement
        const width = dom?.offsetWidth as number
        const height = dom?.offsetHeight as number
        rect.value = { width, height }
      }

      const stopWatchRollArea = watch(rollArea, () => initElementSize())

      const stopWatchRect = watch(rect, (value) => {
        const style = {
          overflow: 'hidden',
          width: props.width || `${value.width}px`,
          height: props.height || `${value.height}px`,
        }
        rollContainerStyle.value = {
          ...rollContainerStyle.value,
          ...style,
        }
      })

      watch(() => props.enable, () => {
        if (props.enable) {
          startAnimation()
          toggleScroll(true)
        }
        else {
          stopAnimation()
          stepCount.value = strategy!.start(rect.value)
          toggleScroll(false)
        }
      })

      async function start() {
        await nextTick()
        initElementSize()
        stepCount.value = strategy!.start(rect.value)
        startAnimation()
      }

      onMounted(async() => {
        start()
        window.addEventListener('resize', start)
      })

      onUnmounted(() => {
        stopAnimation()
        stopWatchRollArea()
        stopWatchRect()
        window.removeEventListener('resize', start)
      })

      const style = computed(() => {
        return enableTransition.value
          ? {
            transition: `all ${props.duration}ms`,
            display: 'flex',
            ...strategy!.style(stepCount.value),
          }
          : {
            display: 'flex',
            ...strategy!.style(stepCount.value),
          }
      })

      /*
        <div>
          <div>
            <div>
            <div>
          </div>
        </div>
      */
      return () => {
        const slot = ctx.slots.default?.()
        Assert.notEmpty(slot, 'SeamlessScroll: You must provide a default slot')
        Assert.isTrue(slot!.length === 1, 'SeamlessScroll: You must provide only one default slot')
        const Comp = slot![0].type as any
        const compProps = slot![0].props
        const compChildren = slot![0].children as any

        return h('div', {
          style: rollContainerStyle.value,
          onMouseover: () => props.enable && props.dishover && toggleScroll(false),
          onMouseout: () => props.enable && props.dishover && toggleScroll(true),
        },
        h('div', {
          ref: rollArea,
          style: style.value,
        },
        [
          h(Comp, { ...compProps }, compChildren),
          h(Comp, { ...compProps }, compChildren),
        ]))
      }
    },
  })
}

/**
 * 无缝滚动组件
 */
export const SeamlessScroll = defineSeamlessScroll()
