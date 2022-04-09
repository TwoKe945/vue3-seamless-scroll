<script setup lang="ts">
import { SeamlessScroll } from '~/../package/index'

</script>
<template>
  <div flex="~" items="center" justify="between">
    <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="top"
        height="38vh"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
    <div>
      <SeamlessScroll
        to="bottom"
        height="38vh"
      >
        <ImageList w100 dir="column" />
      </SeamlessScroll>
    </div>
  </div>
</template>

<style scoped>
.scroll-body {
  position: relative;
  /* background: red; */
  overflow: hidden;
  font-size: 2vw;
  color: red;
}
.scroll-content {
  position: absolute;
  transition: all 0.5s inherit;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
