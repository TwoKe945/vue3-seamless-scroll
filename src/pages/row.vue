<script setup lang="ts">
import { SeamlessScroll } from '~/composables/scroll-core'

</script>
<template>
  <div flex="~ row" justify="center">
    <SeamlessScroll
      m2
      width="100vw" to="left"
      :duration="40"
    >
      <ImageList :length="6" dir="row" />
    </SeamlessScroll>
  </div>
  <div flex="~ row" justify="center">
    <SeamlessScroll
      m2
      width="100vw" to="right"
      :duration="40"
    >
      <ImageList :length="6" dir="row" />
    </SeamlessScroll>
  </div>
  <div flex="~ row" justify="center">
    <SeamlessScroll
      m2
      width="100vw" to="left"
      :duration="40"
    >
      <ImageList :length="6" dir="row" />
    </SeamlessScroll>
  </div>
  <div flex="~ row" justify="center">
    <SeamlessScroll
      m2
      width="100vw" to="right"
      :duration="40"
    >
      <ImageList :length="6" dir="row" />
    </SeamlessScroll>
  </div>
</template>
