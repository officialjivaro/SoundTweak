// src/App.vue
<template>
  <router-view />
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

:host {
  background-color: $BACKGROUND_MAIN;
  color: $TEXT_COLOR;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
