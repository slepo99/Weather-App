<template>
    <div class="skeleton" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults(
  defineProps<{
    width?: string;
    height?: string;
    rounded?: boolean
    minWidth?: string;
  }>(),
  {
    width: "100%",
    height: "100%",
    rounded: false,
    minWidth: "unset"
  },
);
const styles = computed(() => ({
  width: props.width,
  height: props.rounded ? "unset" : props.height,
  borderRadius: props.rounded ? "50%" : "6px",
  aspectRatio: props.rounded ? "1/1" : "unset",
  minWidth: props.minWidth
}));
</script>

<style scoped lang="scss">
.skeleton{
  background:var(--skeleton-bg);
  margin-bottom:10px;
  position:relative;
  overflow:hidden;
}
.skeleton::after {
  content: "";
  position: absolute;
  inset: 0;
  width: 90%;
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