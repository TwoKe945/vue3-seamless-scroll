
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
      :style="{
        marginTop: props.dir === 'row' ? '0px' : '5px',
        marginBottom: props.dir === 'row' ? '0px' : '5px',
        marginLeft: props.dir === 'row' ? '5px' : '0px',
        marginRight: props.dir === 'row' ? '5px' : '0px',
      }"
      rounded="10px"
      h50
      w100
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
      <!-- <img
        w-full h-full
        rounded="10px" src="../assert/1.jpg" alt=""
      > -->
    </div>
  </div>
</template>
