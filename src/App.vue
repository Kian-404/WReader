<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Layout from './layout/index.vue'
import { useThemeStore } from './stores/themeSotre'
const theme = useThemeStore();
</script>

<template>
  <div class="container">
    <n-config-provider style="height: 100%;" :theme="theme.theme">
    <Layout/>
    </n-config-provider>
  </div>
</template>

<style scoped>
</style>
