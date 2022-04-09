import { computed, ref } from 'vue'
import type { Container, Content, Context, ViewPort } from '../types'

function useContext() {
  const seamlessContext = ref<Context>({
    container: {
      el: null as unknown as HTMLDivElement,
      width: 0,
      height: 0,
    },
    content: {
      el: null as unknown as HTMLDivElement,
      width: 0,
      height: 0,
    },
    viewport: {
      width: '0px',
      height: '0px',
    },
  })

  const viewportConfig = computed(() => seamlessContext.value.viewport)
  const containerConfig = computed(() => seamlessContext.value.container)
  const contentConfig = computed(() => seamlessContext.value.content)

  /**
   *  设置滚动区域
   * @param content
   */
  function setContent(content: Content) {
    seamlessContext.value.content = content
  }

  /**
   * 设置滚动容器
   * @param container
   */
  function setContainer(container: Container) {
    seamlessContext.value.container = container
  }

  /**
   * 设置可视窗口
   * @param viewport
   */
  function setViewPort(viewport: ViewPort) {
    seamlessContext.value.viewport = viewport
  }

  return {
    seamlessContext,
    viewportConfig,
    containerConfig,
    contentConfig,
    setContainer,
    setContent,
    setViewPort,
  }
}

export {
  useContext,
}
