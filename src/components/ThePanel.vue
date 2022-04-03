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
    >
      {{ i }}
    </div>
  </div>
</template>
