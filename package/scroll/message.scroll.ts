import type { ExtractPropTypes, PropType } from 'vue'
import { computed, defineComponent, h } from 'vue'
import { SeamlessScroll, seamlessScrollProps } from './seamless.scroll'

const messageScrollProps = {
  ...seamlessScrollProps,
  messages: {
    type: Array as PropType<string[]>,
    required: true,
  },
  messageFormat: {
    type: Function as PropType<(message: string) => string>,
    default: (message: string) => message,
  },
}

export type MessageScrollProps = ExtractPropTypes<typeof messageScrollProps>

export function defineMessageScroll() {
  return defineComponent({
    props: messageScrollProps,
    setup(props) {
      const innerHTML = computed(() => props.messages!.map(props.messageFormat).join(''))

      return () => h(SeamlessScroll,
        { ...props }, {
          default: h('div', { style: 'white-space: nowrap;', innerHTML: innerHTML.value }),
        })
    },
  })
}

/**
 * 公告消息滚动滚动组件
 */
export const MessageScroll = defineMessageScroll()
