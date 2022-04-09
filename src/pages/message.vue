<script setup lang="ts">
import { MessageScroll } from '~/../package/index'

</script>

<template>
  <div>
    <div flex="~ col" justify="center" items="center">
      <MessageScroll
        :messages="['xxxx', 'yyyy', 'zzzz']"
        :message-format="message => `${message}... &nbsp;&nbsp;`"
        to="left" :duration="50"
      />
      <MessageScroll
        width="80vw"
        :messages="[`大约在1637年左右，法国学者费马在阅读丢番图（Diophatus）《算术》拉丁文译本时，曾在第11卷第8命题旁写道：“将一个立方数分成两个立方数之和，或一个四次幂分成两个四次幂之和，或者一般地将一个高于二次的幂分成两个同次幂之和，这是不可能的。关于此，我确信已发现了一种美妙的证法 ，可惜这里空白的地方太小，写不下。”拉丁文原文: &quot;cuius rei demonstrationem mirabilem sane detexi. hanc marginis exiguitas non caperet.&quot;）由于费马没有写下证明，而他的其它猜想对数学贡献良多，由此激发了许多数学家对这一猜想的兴趣。数学家们的有关工作丰富了数论的内容，涉及许多数学手段，推动了数论的发展`]"
        to="left" :duration="50"
      />
    </div>
  </div>
</template>
