# SeamlessScroll


> The component is a scrollable container that can be used to scroll through a list of items.


Demo: https://vuescroll-container.netlify.app/

# SeamlessScroll


| **属性名** | **描述** | **默认值** |  **类型** |
|:---|:---|:---|:---|
|  to  |  滚动方向  | top  |  'top'\|'bottom'\|'left'\|'right' |
|  duration  |  动画时间：  | 17 (1秒 60次) |  Number |
|  dishover  | 是否启用悬停（鼠标悬停停止滚动） | true  |  Number |
|  width  |  可视区宽度  |  auto  |  Number |
|  height  |  可视区高度  |  auto  |  Number |

# 快速使用

> 暂时不支持npm， yarn安装
```html
<script setup lang="ts">
import { SeamlessScroll } from '~/composables/scroll-core'

</script>

<template>
  <SeamlessScroll
    :duration="40" // 默认向上运动
  >
  <!-- 图片显示以列的形式展示 -->
    <ImageList :length="3" dir="column" /> 
  </SeamlessScroll>
</template>
```

**ImageList.vue**
```html

<script setup lang="ts">
const props = withDefaults(defineProps<{
  length: number
  dir: 'row' | 'column'
}>(), {
  length: 3,
  dir: 'column',
})

</script>

<template>
  <div
    :style="{
      display: 'flex',
      flexDirection: props.dir,
    }"
  >
    <div
      v-for="i in props.length"
      :key="i"
      :style="{
        // 注意事项，横向滚动和纵向滚动会造成item的外边距不受控制，因此，横向滚动设置左右外边距，纵向滚动设置上下外边距
        marginTop: props.dir === 'row' ? '0px' : '5px',
        marginBottom: props.dir === 'row' ? '0px' : '5px',
        marginLeft: props.dir === 'row' ? '5px' : '0px',
        marginRight: props.dir === 'row' ? '5px' : '0px',
      }"
      rounded="10px"
      h50
      w100
      bg-gray-200
      font-mono
      font-size="1.5rem"
      text-blue
      hover="cursor-pointer"
    >
      <img
        w-full h-full
        rounded="10px" :src="`https://picsum.photos/seed/img-${Math.floor(i)}/400/200`" alt=""
      >
    </div>
  </div>
</template>
```

# MessageScroll

| **属性名** | **描述** | **默认值** |  **类型** |
|:---|:---|:---|:---|
|  messages  |  展示的消息  | [] (必填项)  |  Array<string> |
|  messageFormat  |  单条信息格式化  |  (message: string) => message`, |  Function<(string) => string >   |

> 注：这是由SeamlessScroll封装的组件，支持SeamlessScroll的所有属性


```html 
<script setup lang="ts">
import { MessageScroll

} from '~/composables/scroll-core'

</script>

<template>
  <MessageScroll
    :messages="['xxxx', 'yyyy', 'zzzz']"
    :message-format="message => `${message}... &nbsp;&nbsp;`"
    to="left" :duration="50"
  />
</template>
```


# fix

- 优化使用组件时需要自己绑定id
- 修改组件渲染使用render函数
