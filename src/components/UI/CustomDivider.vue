<template>
  <hr class="custom-divider" :style="dividerStyles"/>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    vertical?: boolean;
    color?: string;
    width?: string;
  }>(),
  {
    vertical: false,
    color: "#3b82f666",
    width: "1px",
  },
);
const dividerStyles = computed(() => {
  return {
    backgroundColor: props.color,
    width: props.vertical ? props.width : "100%",
    height: props.vertical ? "100%" : props.width,
  };
});
</script>

<style scoped>
.custom-divider {
  border: none;
  border-radius: 8px;
}
</style>
