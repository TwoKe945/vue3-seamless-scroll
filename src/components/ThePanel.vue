<script setup lang="ts">
</script>

<template>
  <div flex="~ col">
    <div
      v-for="i in 3"
      :key="i"
      m1
      rounded="10px"
      w100
      h50
      bg-gray-200
      font-mono
      font-size="1.5rem"
      text-blue
      hover="cursor-pointer"
    >
      <img
        w-full h-full
        rounded="10px" :src="`https://picsum.photos/seed/${i}/1920/1080`"
      >
    </div>
  </div>
</template>
