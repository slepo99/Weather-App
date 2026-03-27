<template>
  <div class="custom-dropdown-wrapper">
    <div @click="isOpen = !isOpen" class="custom-dropdown">
      {{ modelValue || props.placeholder || 'Select an option' }}
    </div>
    <div
      :class="{ 'custom-dropdown-options-active': isOpen }"
      class="custom-dropdown-options"
    >
      <div v-for="option in props.options" :key="option" class="custom-dropdown-element" @click="selectOption(option)">
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {  ref } from "vue";
const props = defineProps<{
  options: (string | number)[];
  placeholder?: string;
}>();
const modelValue = defineModel<string | number | null>({
  default: null,         
  required: false
});
const isOpen = ref(false);

function selectOption(option: string | number) {
  modelValue.value = option;
  isOpen.value = false;
}


</script>

<style scoped lang="scss">
.custom-dropdown-wrapper {
  position: relative;
}
.custom-dropdown {
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
  z-index: 3 !important;
  position: relative;
}
.custom-dropdown-options {
  position: absolute;
  top: 30px;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: $block-shadow;
  padding: 8px 0;
  width: 100%;
  overflow: hidden;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.25s ease;
  z-index: 2;
  max-height: 240px;
}
.custom-dropdown-options-active {
  transform: scaleY(1);
  overflow-y: auto;
}
.custom-dropdown-element {
  cursor: pointer;
  height: 24px;
  padding: 0 8px;
}

.custom-dropdown-element:hover {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
