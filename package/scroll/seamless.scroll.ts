import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent, h, nextTick, onMounted, onUnmounted, ref, renderSlot, watch } from 'vue'
import { SCROLL_STRATEGY } from '../strategy'
import { useAutoDOM, useContext, useRequestAnimation } from '../composable'

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
    name: 'SeamlessScroll',
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

      const overContent = computed(() => strategy?.overContent(containerConfig.value, viewport.value) as boolean)
      // 容器根据内容自适应
      useAutoDOM(contentRef, (el, width, height) => {
        if (width !== 0 && height !== 0) {
          setContainer({
            el: containerRef.value as HTMLDivElement,
            width,
            height,
          })
          setContent({
            el: contentRef.value as HTMLDivElement,
            width,
            height,
          })
          setViewPort({
            width: props.width || `${width}px`,
            height: props.height || `${height}px`,
          })
        }
        containerRef.value!.style.width = viewportConfig.value.width
        containerRef.value!.style.height = viewportConfig.value.height

        contentRef.value!.style.width = strategy?.contentWidth(contentConfig.value, props.width as string) as string
        contentRef.value!.style.height = strategy?.contentHeight(contentConfig.value, props.height as string) as string

        viewport.value = {
          width: containerRef.value?.offsetWidth as number,
          height: containerRef.value?.offsetHeight as number,
        }
      })

      const enableMove = computed(() => props.enable && overContent.value)

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

      const stopWatchEnable = watch(() => props.enable, () => {
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

      /**
       * 监听是否超出可视区域
       */
      const stopWatchOverContent = watch(() => overContent.value, (value) => {
        if (value)
          toggleScroll(value)
      })

      /**
       * 挂载时：
       * 1、初始化滚动状态: (1) 内容没有超出可视区域不滚动 （2）设置有参数enable=false不滚动
       * 2、设置滚动的起点位置
       * 3、启动滚动动画
       */
      onMounted(async() => {
        await nextTick()
        // 初始化滚动状态
        toggleScroll(enableMove.value)
        moveLength.value = strategy!.start(containerConfig.value)
        startAnimation()
      })

      /**
       * 卸载时：
       * 1、清除动画
       * 2、清除监听 enable
       * 2、清除对是否超出可视区域的监听
       */
      onUnmounted(() => {
        stopAnimation()
        stopWatchEnable()
        stopWatchOverContent()
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
        }, overContent.value
          ? [
            renderSlot(ctx.slots, 'default'),
            renderSlot(ctx.slots, 'default')]
          : [
            renderSlot(ctx.slots, 'default'),
          ]))
      }
    },
  })
}

/**
 * 无缝滚动组件
 */
export const SeamlessScroll = defineSeamlessScroll()
