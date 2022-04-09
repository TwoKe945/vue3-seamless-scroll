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

const msg = ref('')

function add() {
  if (msg.value !== '')
    messages.value.push(msg.value)
}

</script>

<template>
  <div flex="~" justify="center">
    <div>
      <div w100 m3 text-black flex="~ gap-1">
        <input v-model="msg" pl-2>
        <button btn @click="add">
          添加
        </button>
      </div>
      <SeamlessScroll bg="red/50" height="400px" width="400px">
        <div>
          <div v-for="(item,index) in messages" :key="index" p1>
            {{ item }}
          </div>
        </div>
      </SeamlessScroll>
    </div>
  </div>
</template>

<style>
</style>
