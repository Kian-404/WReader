<template>
  <div class="header">
    <n-icon v-show="!theme.theme" size="24"   @click="theme.changeDarkThem()">
      <MoonIcon/>
    </n-icon>
    <n-icon v-show="theme.theme" size="24"  @click="theme.changeLightTheme()">
      <SunnyIcon/>
    </n-icon>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Headers'
}
</script>
<script setup lang="ts">
import { useThemeStore } from '../stores/themeSotre';
import {
  MoonOutline as MoonIcon,
  SunnyOutline as SunnyIcon
}  from '@vicons/ionicons5';
const theme = useThemeStore();
</script>

<style scoped>
.header{
  display: flex;
  flex-direction: row-reverse;
  padding: 10px;
}
.n-icon{
  cursor: pointer;
}
</style>