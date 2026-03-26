<template>
  <button @click="handleClick" class="custom-btn">
    <slot name="icon"> </slot>
    <span class="text-default btn-label">
      <slot name="label"> </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
// interface Props {
//   color?: string;
// }
// const props = defineProps<Props>();

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
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
.btn-label {
  font-weight: 500;
}
</style>
