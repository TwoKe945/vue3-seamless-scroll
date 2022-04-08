<script setup lang="ts">
import { ref } from 'vue'
import { useAutoResize } from '~/composables/hooks'
const dom = ref<HTMLDivElement>()

useAutoResize(dom)

</script>

<template>
  <div ref="dom" w100 h100 bg-red />
</template>
