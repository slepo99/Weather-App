<template>
  <div class="loader" :style="spinnerStyle"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    width?: string;
  }>(),
  {
    width: "20px",
  },
);
const spinnerStyle = computed(() => ({
  width: props.width,
}));
</script>

<style scoped>
.loader {
  padding: 3px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #306baf;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}
@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
