<template>
  <div class="app-header__sidebar" :class="{ active: isSidebarActive }">
    qwe
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isSidebarActive: boolean;
  }>(),
  {
    isSidebarActive: false,
  },
);
</script>

<style scoped lang="scss">
.app-header__sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  transform: translateX(100%);
  transition: transform 0.3s ease;
   background-color: var(--content-bg);
  box-shadow: $block-shadow;
  z-index: 999;
}
.active {
  transform: translateX(0) !important;
}
</style>
