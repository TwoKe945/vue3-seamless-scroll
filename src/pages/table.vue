<script setup lang="ts">
import { ref } from 'vue'
import type { RowData } from '~/composables'
import { defineColumns, defineTableScroll } from '~/composables'

const columns = defineColumns([
  {
    title: 'Name',
    key: 'name',
    width: '5vw',
  },
  {
    title: 'Age',
    key: 'age',
    width: '5vw',
  },
  {
    title: 'Group',
    key: 'group',
    width: '5vw',
  },
] as const)

type TableData = RowData<typeof columns>

const dataArray: TableData[] = [
  {
    name: 'John Brown',
    age: 18,
    group: 'A',
  },
  {
    name: 'Jim Green',
    age: 25,
    group: 'B',
  },
  {
    name: 'Joe Black',
    age: 30,
    group: 'C',
  },
  {
    name: 'Jim Red',
    age: 28,
    group: 'D',
  },
]

const TableScroll = defineTableScroll<TableData>(columns)

const clickItemHandler = function(data: TableData) {
  alert(`点击： ${data.name}`)
}

const enable = ref(false)

</script>
<template>
  <div m2>
    <div btn @click="() => enable = !enable">
      {{ enable ? '暂停' : '激活' }}
    </div>
  </div>
  <div flex="~ row" justify="center">
    <TableScroll :enable="enable" width="400px" :data="dataArray" @clickItem="clickItemHandler" />
  </div>
</template>

<style>
.table-scroll {
  width:400px;
}
.table-scroll-header {
  background-color: #1010b820;
  padding: 10px;
}
.table-scroll-body {
  background-color: #00000040;
}

.table-scroll-row {
  padding: 5px;
}

.table-scroll-row:hover{
  background-color: #0000ff20;
}
</style>
