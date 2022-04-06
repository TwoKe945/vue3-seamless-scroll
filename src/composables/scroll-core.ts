import type { ExtractPropTypes, PropType } from 'vue'
import { defineComponent } from 'vue'
import { Assert } from './exception'

/**
 * 元素接口
 */
interface ElementSize {
  width: number
  height: number
}

/**
 * 滚动策略接口
 */
interface Strategy {
  style: (step: number) => { transform?: string; flexDirection?: string; width?: string; height?: string }
  isOverflow: (stepCount: number, size: ElementSize) => boolean
  start: (size: ElementSize) => number
}

/**
 * 滚动策略
 */
const STRATEGY_FACTORY = {
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

const seamlessScrollProps = {
  to: { // 滚动方向
    type: String as PropType<'top' | 'left' | 'right' | 'bottom'>,
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
    default: 120,
  },
}

export type SeamlessScrollProps = ExtractPropTypes<typeof seamlessScrollProps>

function createSeamlessScroll() {
  return defineComponent({
    props: seamlessScrollProps,
    setup(props, ctx) {
      // 滚动区域
      const rollArea = ref<HTMLDivElement>()
      // 滚动计步数
      const stepCount = ref()
      const scrolling = ref(true)
      const toggleScroll = function(flag: boolean) {
        scrolling.value = flag
      }
      const enableTransition = ref(true)
      let rollTimer: any

      const rect = ref<ElementSize>({ width: 0, height: 0 })

      const strategy = STRATEGY_FACTORY[props.to]

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

      onMounted(async() => {
        await nextTick()
        initElementSize()
        stepCount.value = strategy.start(rect.value)
        rollTimer = setInterval(() => move(strategy.start(rect.value)), props.duration)
      })

      onUnmounted(() => {
        if (rollTimer)
          clearInterval(rollTimer)
        stopWatchRollArea()
        stopWatchRect()
      })

      const style = computed(() => {
        return enableTransition.value
          ? {
            transition: `all ${props.duration}ms`,
            display: 'flex',
            ...strategy.style(stepCount.value),
          }
          : {
            display: 'flex',
            ...strategy.style(stepCount.value),
          }
      })

      return () => {
        const slot = ctx.slots.default?.()
        Assert.notEmpty(slot, 'SeamlessScroll: You must provide a default slot')
        Assert.isTrue(slot!.length === 1, 'SeamlessScroll: You must provide only one default slot')
        const Comp = slot![0].type as any
        const compProps = slot![0].props
        const compChildren = slot![0].children as any

        return h('div', {
          style: rollContainerStyle.value,
          onMouseover: () => props.dishover && toggleScroll(false),
          onMouseout: () => props.dishover && toggleScroll(true),
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

export const SeamlessScroll = createSeamlessScroll()

function createMessageScroll() {
  return defineComponent({
    props: {
      messages: {
        type: Array as PropType<string[]>,
        required: true,
      },
      messageFormat: {
        type: Function as PropType<(message: string) => string>,
        default: (message: string) => message,
      },
      ...seamlessScrollProps,
    },
    setup(props) {
      return () => h(SeamlessScroll,
        { ...props }, {
          default: h('div', { style: 'white-space: nowrap;', innerHTML: props.messages.map(props.messageFormat).join('') }),
        })
    },
  })
}

/**
 * 公告消息滚动
 */
export const MessageScroll = createMessageScroll()
