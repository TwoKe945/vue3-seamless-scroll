import type { Ref } from 'vue'

function useContext(el: Ref<HTMLElement>) {
  return el
}

export {
  useContext,
}
