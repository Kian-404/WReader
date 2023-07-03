<template>
  <div>
    <n-card v-for="item in bookList" title="卡片">
      {{ item }}
    </n-card>
  </div>
</template>

<script setup lang="ts">
import * as localforage from 'localforage'
import { ref } from 'vue';
let bookList=  ref<string[]>([]);
localforage.keys().then(function(keys) {
    // 包含所有 key 名的数组
    console.log(keys);
    bookList.value = keys;
}).catch(function(err) {
    // 当出错时，此处代码运行
    console.log(err);
});
</script>

<style scoped>

</style>