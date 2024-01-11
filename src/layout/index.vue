<template>
  <n-layout style="height: 100%;" has-sider>
    <n-layout-sider 
        bordered
        show-trigger="bar"
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        >
       <n-menu
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
        />
    </n-layout-sider>
    <n-layout>
      <n-layout-header bordered>
       <Headers/>
      </n-layout-header>
      <n-layout-content content-style="padding: 24px;">
       <Content/>
      </n-layout-content>
      <n-layout-footer bordered>
        <Footer/>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>
<script lang="ts">
export default {
  name: "Layout",
};
</script>
<script setup lang="ts">
import Headers from './header.vue'
import Content from './content.vue'
import Footer from './footer.vue'
import {
  HomeOutline as HomeIcon,
  BookOutline as BookIcon,
  ReaderOutline as ReaderIcon,
  BookmarksOutline as BookmarksIcon
} from '@vicons/ionicons5'
import { Component, h } from 'vue';
import { NIcon } from 'naive-ui'
import { RouterLink } from 'vue-router';

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
const menuOptions = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            path: '/'
          }
        },
        { default: () => '首页' }
      ),
    key: 'hear-the-wind-sing',
    icon: renderIcon(HomeIcon)
  },
  {
    label: '在读',
    key: 'book-reader',
    icon: renderIcon(BookIcon),
  },
  {
    label: () =>
      h(
        RouterLink,
        {
           to: {
            path: '/all'
          }
        },
        { default: () => '所有' }
      ),
    key: 'book-all',
    icon: renderIcon(ReaderIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
           to: {
            path: '/bookmark'
          }
        },
        { default: () => '书签' }
      ),
    key: 'book-marks',
    icon: renderIcon(BookmarksIcon),
  },
  
]

</script>

<style scoped></style>
