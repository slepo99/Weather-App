<template>
  <button @click="handleClick" :disabled="props.disabled" class="custom-btn" :style="styles">
    <slot name="icon"> </slot>
    <div v-if="$slots.label" class="btn-label-wrapper">
      <span class="text-default btn-label">
        <slot name="label"> </slot>
      </span>
     
    </div>
     <CustomLoader v-if="props.isLoading" />
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CustomLoader from "./CustomLoader.vue";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    isLoading?: boolean;
    width?: string;
  }>(),
  {
    disabled: false,
    isLoading: false,
    width: 'auto'
  },
);
const emit = defineEmits(["click"]);

const handleClick = () => {
  if (!props.disabled && !props.isLoading) {
    emit("click");
  }
};
const styles = computed(() => {
  return {
    width: props.width
  }
})
</script>

<style scoped>
.custom-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background-color: var(--btn-bg);
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  height: 32px;
  justify-content: space-between;
}
span {
  font-size: 14px;
}
.custom-btn:hover {
  background-color: color-mix(in srgb, var(--btn-bg) 90%, black);
}
.custom-btn:active {
  filter: brightness(0.8);
  transform: scale(0.98);
}
.btn-label-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  justify-content: center;
}
.btn-label {
  font-weight: 500;
}
</style>
