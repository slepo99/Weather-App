<template>
  <div v-if="isSidebarActive" class="overlay" @click="emit('close')"></div>
  <div
    ref="sidebarRef"
    class="app-header__sidebar"
    :class="{ active: isSidebarActive }"
  >
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

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped lang="scss">
.app-header__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 60%;
  max-width: 320px;
  height: 100%;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
  z-index: 999;
}
.active {
  transform: translateX(0) !important;
}
.overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  background: rgba(0, 0, 0, 0.3);
  z-index: 997;
}
</style>
