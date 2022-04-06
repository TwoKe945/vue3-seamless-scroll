<script setup lang="ts">
import { SeamlessScroll } from '~/composables/scroll-core'

</script>
<template>
  <div flex="~" items="center" justify="between">
    <div>
      <SeamlessScroll
        to="top"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="top"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
        :duration="40"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
  </div>
</template>
