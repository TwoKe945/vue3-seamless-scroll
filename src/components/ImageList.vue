
<script setup lang="ts">
const props = withDefaults(defineProps<{
  length: number
  dir: 'row' | 'column'
}>(), {
  length: 3,
  dir: 'column',
})
</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: props.dir,
    }"
  >
    <div
      v-for="i in props.length"
      :key="i"
      rounded="10px"
      h50
      w100
      m2
      bg-gray-200
      font-mono
      font-size="1.5rem"
      text-blue
      hover="cursor-pointer"
    >
      <img
        w-full h-full
        rounded="10px" :src="`https://picsum.photos/seed/img-${Math.floor(i)}/400/200`" alt=""
      >
    </div>
  </div>
</template>
