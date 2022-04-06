import type { App } from 'vue'
import seamlessScroll from './src/index.vue'

export const ReSeamlessScroll = Object.assign(seamlessScroll, {
  install(app: App) {
    app.component(seamlessScroll.name, seamlessScroll)
  },
})

export default ReSeamlessScroll
