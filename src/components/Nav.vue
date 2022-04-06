<script setup lang="ts">
</script>

<template>
  <div w-full mb10 flex="~ row" justify="between" items="center">
    <div>
      <router-link to="/">
        <div btn>
          /
        </div>
      </router-link>
    </div>
    <div>
      {{ $route.path }}
    </div>
    <div>
      <RouterItem />
    </div>
  </div>
</template>
