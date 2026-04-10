<template>
    <div class="skeleton" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
  }>(),
  {
    width: "100%",
    height: "100%"
  },
);
const styles = computed(() => ({
  width: props.width,
  height: props.height
}));
</script>

<style scoped lang="scss">
.skeleton{
  background:var(--skeleton-bg);
  border-radius:6px;
  margin-bottom:10px;
  position:relative;
  overflow:hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 90%; /* было 30% */
  background: var(--skeleton-wave);
  transform: translateX(-100%);
  animation: shimmer 1.7s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(200%);
  }
}
</style>