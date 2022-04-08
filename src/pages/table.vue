<script setup lang="ts">
import { ref } from 'vue'
import type { RowData } from '~/composables'
import { defineColumns, defineTableScroll } from '~/composables'

const columns = defineColumns([
  {
    title: 'Name',
    key: 'name',
    width: '40%',
  },
  {
    title: 'Age',
    key: 'age',
    width: '40%',
  },
  {
    title: 'Group',
    key: 'group',
    width: '40%',
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
  <div>
    <div @click="() => enable = !enable">
      1111
    </div>
  </div>
  <div flex="~ row" justify="center">
    <TableScroll :enable="enable" :data="dataArray" :duration="100" @clickItem="clickItemHandler" />
  </div>

  <!-- <div flex="~ row" m5 justify="center">
    <TableScroll2 :data="dataArray" @clickItem="clickItemHandler" />
  </div> -->
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
  width:400px !important;
}

.table-scroll-row {
  padding: 5px;
}

.table-scroll-row:hover{
  background-color: #0000ff20;
}
</style>
