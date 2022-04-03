<script setup lang="ts">
</script>

<template>
  <div flex="~ row" justify="center">
    <RollContainer el="panel" :dishover="false" to="right" :duration="10">
      <template #scrollPanel>
        <ThePanel id="panel" />
      </template>
    </RollContainer>
  </div>
</template>
