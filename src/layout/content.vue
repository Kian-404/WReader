<template>
  <div class="content">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Content'
}
</script>
<script setup lang="ts">

</script>

<style scoped>
.content{
  height: calc(100vh - 120px);
}

</style>