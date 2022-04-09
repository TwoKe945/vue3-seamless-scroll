import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Assert } from '../assert'
import { SCROLL_STRATEGY } from '../strategy'
import { getStyle, useAutoDOM, useContext, useRequestAnimation } from '../composable'
import { getRealNumber } from '../composable/useRequestAnimation'

export const seamlessScrollProps = {
  to: { // 滚动方向
    type: String as PropType<'top' | 'left' | 'bottom' | 'right'>,
    default: 'top',
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
  enable: { // 是否启用滚动
    type: Boolean,
    default: true,
  },
}

export type SeamlessScrollProps = ExtractPropTypes<typeof seamlessScrollProps>

export function defineSeamlessScroll() {
  return defineComponent({
    /**
     * 滚动区域的参数
     */
    props: seamlessScrollProps,
    setup(props, ctx) {
      const { viewportConfig, setContainer, setContent, setViewPort, containerConfig, contentConfig } = useContext()
      const moveLength = ref(0) // 移动的长度
      // 定义滚动容器和内容dom
      const containerRef = ref<HTMLDivElement>()
      const contentRef = ref<HTMLDivElement>()

      const containerRefStyle = ref({})
      const contentRefStyle = ref({})

      const strategy = SCROLL_STRATEGY.get(props.to)
      const viewport = ref({ width: 0, height: 0 })

      // 容器根据内容自适应
      useAutoDOM(contentRef, (el, width, height) => {
        setContent({
          el: contentRef.value as HTMLDivElement,
          width,
          height: height * 2,
        })
        setContainer({
          el: containerRef.value as HTMLDivElement,
          width,
          height,
        })
        setViewPort({
          width: props.width || `${width}px`,
          height: props.height || `${height}px`,
        })
        contentRefStyle.value = {
          width: strategy?.contentWidth(contentConfig.value, props.width as string),
          height: strategy?.contentHeight(contentConfig.value, props.height as string),
        }
      })

      const stopWatchViewport = watch(viewportConfig, (value) => {
        containerRefStyle.value = {
          width: value.width,
          height: value.height,
        }
      })
      watch(containerRefStyle, async() => {
        await nextTick()
        viewport.value = {
          width: getRealNumber(getStyle(containerRef.value as HTMLElement, 'width')),
          height: getRealNumber(getStyle(containerRef.value as HTMLElement, 'height')),
        }
      })

      const enableMove = computed(() => props.enable && strategy?.overContent(containerConfig.value, viewport.value) as boolean)

      // 默认样式
      const defaultcontainerRefStyle = {
        position: 'relative',
        overflow: 'hidden',
      }
      const defaultContentStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
      }

      const scrolling = ref(true)
      const toggleScroll = function(flag: boolean) {
        scrolling.value = flag
      }

      // 初始化滚动状态
      toggleScroll(enableMove.value)

      const { startAnimation, stopAnimation } = useRequestAnimation(() => {
        move(strategy!.start(containerConfig.value))
      })
      /**
       * 检查是否超出边界
       */
      const isOverflow = computed(() => strategy!.isOverflow(moveLength.value, containerConfig.value))
      /**
       * 移动
       */
      function move(startStep = 0) {
        if (!scrolling.value)
          return
        if (isOverflow.value)
          moveLength.value = startStep
        moveLength.value += 1
      }

      watch(() => props.enable, () => {
        if (enableMove.value) {
          startAnimation()
          toggleScroll(true)
        }
        else {
          stopAnimation()
          moveLength.value = strategy!.start(containerConfig.value)
          toggleScroll(false)
        }
      }, {
        immediate: true,
      })

      const isUpdate = ref(false)
      let updateTimer: any
      function updateData(fn: () => void) {
        isUpdate.value = true
        if (updateTimer) clearTimeout(updateTimer)
        updateTimer = setTimeout(() => {
          fn()
          isUpdate.value = false
        }, 5)
      }

      onMounted(async() => {
        await nextTick()
        moveLength.value = strategy!.start(containerConfig.value)
        startAnimation()
      })

      onUnmounted(() => {
        stopAnimation()
        stopWatchViewport()
        if (updateTimer) clearTimeout(updateTimer)
      })

      ctx.expose({
        updateData,
      })

      const contentStyle = computed(() => {
        return {
          transition: 'all 16ms linear',
          display: 'flex',
          ...contentRefStyle.value,
          ...strategy!.style(moveLength.value),
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
          class: 'seamless-scroll-container',
          ref: containerRef,
          style: {
            ...defaultcontainerRefStyle,
            ...containerRefStyle.value,
          },
          onMouseover: () => enableMove.value && props.dishover && toggleScroll(false),
          onMouseout: () => enableMove.value && props.dishover && toggleScroll(true),
        },
        h('div', {
          class: 'seamless-scroll-content',
          ref: contentRef,
          style: {
            ...defaultContentStyle,
            ...contentStyle.value,
          },
        },
        isUpdate.value
          ? []
          : (strategy?.overContent(containerConfig.value, viewport.value)
            ? [h(Comp, { ...compProps }, compChildren),
              h(Comp, { ...compProps }, compChildren)]
            : [
              h(Comp, { ...compProps }, compChildren),
            ])
          ,
        ))
      }
    },
  })
}

/**
 * 无缝滚动组件
 */
export const SeamlessScroll = defineSeamlessScroll()
