<script setup lang="ts">
import { ref } from 'vue'
import { SeamlessScroll } from '../../package/index'

const messages = ref([
  '这是第1条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第2条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第3条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第4条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第5条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第6条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第7条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第8条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
  '这是第9条数据,巴拉巴拉巴拉巴拉巴拉巴拉....',
])

</script>

<template>
  <div flex="~" justify="center">
    <SeamlessScroll bg="red/50" width="400px" :step="32" :duration="3000">
      <div>
        <div v-for="(item,index) in messages" :key="index" style="transition: all 3s linear;" p1>
          {{ item }}
        </div>
      </div>
    </SeamlessScroll>
  </div>
</template>

<style>
</style>
