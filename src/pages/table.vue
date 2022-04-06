<script setup lang="ts">
import type { RowData } from '~/composables/scroll-core'
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
const TableScroll2 = defineTableScroll<TableData>(columns, (key: string, value: any) => {
  if (key === 'age') {
    if (value >= 30)
      return { color: 'red' }
    else if (value < 30 && value > 20)
      return { color: 'blue' }
    else
      return { color: 'green' }
  }
  else if (key === 'group') {
    if (value === 'A')
      return { color: 'green' }
    else if (value === 'B')
      return { color: 'blue' }
    else
      return { color: 'red' }
  }
  return {}
})

const clickItemHandler = function(data: TableData) {
  alert(`点击： ${data.name}`)
}

</script>
<template>
  <div flex="~ row" justify="center">
    <TableScroll :data="dataArray" @clickItem="clickItemHandler" />
  </div>

  <div flex="~ row" m5 justify="center">
    <TableScroll2 :data="dataArray" @clickItem="clickItemHandler" />
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
  width:400px !important;
  padding: 10px 0px;
}

.table-scroll-row {
  padding: 5px;
}

.table-scroll-row:hover{
  background-color: #0000ff20;
}
</style>
