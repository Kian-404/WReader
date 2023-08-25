<template>
  <div>
    <n-grid cols="2 s:3 m:4 l:5 xl:6 2xl:7" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="item in bookList">
        <n-card title="卡片" @click="showBook(item.fileName)">
          {{ item.fileName }}
          <n-image
            width="100"
            :src="item.coverUrl"
          />
          <img :src="item.coverUrl" alt="">
        </n-card>
      </n-grid-item>
    </n-grid>
    <a v-show="bookItem" id="prev" href="#prev" class="navlink">...</a>
    <div id="area"></div>
    <a v-show="bookItem" id="next" href="#next" class="navlink">...</a>
  </div>
</template>

<script setup lang="ts">
import * as localforage from "localforage";
import { ref } from "vue";
import ePub from "epubjs";
let bookList = ref<any[]>([]);
localforage
  .keys()
  .then(function (keys) {
    // 包含所有 key 名的数组
    console.log(keys);
    keys.map(async (key: string) => {
      let a =await localforage.getItem(key)
      console.log(a)
      bookList.value.push(a);
    })
    // bookList.value = keys;
  })
  .catch(function (err) {
    // 当出错时，此处代码运行
    console.log(err);
  });
let bookItem = ref();
const showBook = (book: any) => {
  console.log(book);
  bookItem.value = book;
  localforage.getItem(book).then(async (res: any) => {
    console.log(res);
    console.log(ePub);
    // var Book = ePub({ restore: true });
    let file = await new Blob([res.file], { type: "application/epub+zip" }).arrayBuffer();
    var book = ePub(file, {});
    let coverUrl = await book.coverUrl()
    console.log(book);
    console.log(coverUrl);
    
    var rendition = book.renderTo("area", { flow: "scrolled-doc", width: "900", height: "600" });
    var displayed = rendition.display();
    var next: any = document.getElementById("next");
    next.addEventListener(
      "click",
      function (e: any) {
        rendition.next();
        e.preventDefault();
      },
      false
    );

    var prev: any = document.getElementById("prev");
    prev.addEventListener(
      "click",
      function (e: any) {
        rendition.prev();
        e.preventDefault();
      },
      false
    );
    rendition.on("relocated", function (location: any) {
      console.log(location);
    });

    rendition.on("rendered", function (section: any) {
      var nextSection = section.next();
      var prevSection = section.prev();
      var nextNav: any;
      var nextLabel: any;
      var prevNav: any;
      var prevLabel: any;
      if (nextSection) {
        nextNav = book.navigation.get(nextSection.href);

        if (nextNav) {
          nextLabel = nextNav.label;
        } else {
          nextLabel = "next";
        }

        next.textContent = nextLabel + " »";
      } else {
        next.textContent = "";
      }

      if (prevSection) {
        prevNav = book.navigation.get(prevSection.href);

        if (prevNav) {
          prevLabel = prevNav.label;
        } else {
          prevLabel = "previous";
        }

        prev.textContent = "« " + prevLabel;
      } else {
        prev.textContent = "";
      }
    });
  });
};
</script>

<style scoped>
#area{
  width: 900px;
  margin: 0 auto;
}
#prev{
  position: absolute;
  top: 50%;
  left: 20px;
}
#next {
  position: absolute;
  top: 50%;
  right: 20px;
}
</style>
