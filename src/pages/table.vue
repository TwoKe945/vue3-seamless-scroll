<script setup lang="ts">
import type { RowData } from '../composables/scroll-core'
import { defineColumns, defineTableScroll } from '~/composables/scroll-core'

const columns = defineColumns([
  {
    title: 'Name',
    key: 'name',
    width: '100px',
  },
  {
    title: 'Age',
    key: 'age',
    width: '60px',
  },
  {
    title: 'Group',
    key: 'group',
    width: '60px',
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

</script>
<template>
  <div flex="~ row" justify="center">
    <TableScroll :data="dataArray" />
  </div>
</template>

<style>
.table-scroll {
  width:400px;
}
.table-scroll-header {
  background-color: #ff000040;
  padding: 10px;
}
.table-scroll-body {
  background-color: #00ff0020;
  width:400px !important;
  padding: 10px;
}

.table-scroll-row {
  padding: 5px;
}

.table-scroll-row:hover{
  background-color: #0000ff20;
}

</style>
