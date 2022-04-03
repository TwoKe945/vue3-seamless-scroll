<script setup lang="ts">
</script>

<template>
  <div flex="~ row" justify="center">
    <RollContainer
      el="panel" to="bottom"
      height="10rem"
      :duration="40"
    >
      <template #scrollPanel>
        <ThePanel id="panel" />
      </template>
    </RollContainer>
  </div>
</template>
