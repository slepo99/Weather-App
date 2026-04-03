<template>
  <div
    ref="sidebarRef"
    class="app-header__sidebar"
    :class="{ active: isSidebarActive }"
  >
    qwe
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
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

const sidebarRef = ref<HTMLElement | null>(null);

const handleClickOutside = (e: MouseEvent) => {

  if (!props.isSidebarActive) return;
  if (!sidebarRef.value) return;

  const target = e.target as Node;

  if (!sidebarRef.value.contains(target)) {
    console.log("Clicked outside sidebar");
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
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
</style>
