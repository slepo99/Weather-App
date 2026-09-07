<template>
  <div
    ref="dropdownRef"
    class="custom-dropdown-wrapper"
    tabindex="0"
    role="combobox"
    aria-haspopup="listbox"
    :aria-expanded="isOpen"
    :style="dropDownStyles"
    @click.stop="toggleDropdown"
  >
    <div class="custom-dropdown">
      <span class="selected-text text-default "> {{ modelValue || props.placeholder }}</span>
      <span class="dropdown-chevron" :class="{ rotated: isOpen }"> ▼ </span>
    </div>
    <div
      :class="{ 'custom-dropdown-options-active': isOpen }"
      class="custom-dropdown-options"
    >
      <div
        v-for="option in props.options"
        :key="option"
        class="custom-dropdown-element selected-text"
        :class="{ selected: option === modelValue }"
        @click.stop="selectOption(option)"
      >
        <span class="option-text" :title="String(option)">
          {{ option }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
const props = withDefaults(
  defineProps<{
    options: (string | number)[];
    placeholder?: string;
    width?: string;
  }>(),
  {
    placeholder: "Select an option",
    width: "100%",
  },
);
const modelValue = defineModel<string | number | null>({
  default: null,
  required: false,
});
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const dropDownStyles = computed(() => {
  return {
    maxWidth: props.width,
  };
});
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};
const closeDropdown = () => {
  isOpen.value = false;
};
const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    closeDropdown();
  }
};
function selectOption(option: string | number) {
  modelValue.value = option;
  isOpen.value = false;
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.custom-dropdown-wrapper {
  position: relative;
  display: inline-block;
  width: 100%;
}

.custom-dropdown {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 4px 12px;
  background-color: var(--btn-bg);
  color: #fff;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 32px;
  width: 100%;
  z-index: 6;
  overflow: hidden;
}
.custom-dropdown:hover {
  background-color: color-mix(in srgb, var(--btn-bg) 90%, black);
}
.custom-dropdown:active {
  filter: brightness(0.8);
  transform: scale(0.98);
}
.selected-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
}

.dropdown-chevron {
  font-size: 12px;
  transition: transform 0.25s ease;
  margin-left: auto;
}

.dropdown-chevron.rotated {
  transform: rotate(180deg);
}

.custom-dropdown-options {
  position: absolute;
  top: 100%;
  margin-top: 4px;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: $block-shadow;
  padding: 8px 0;
  width: 100%;
  min-width: 100%;
  overflow: hidden;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.25s ease;
  z-index: 4;
  max-height: 240px;
}

.custom-dropdown-options-active {
  transform: scaleY(1);
  overflow-y: auto;
}

.custom-dropdown-element {
  cursor: pointer;
  height: 32px;
  padding: 0 12px;
  display: flex;
  align-items: center;
}

.custom-dropdown-element:hover,
.custom-dropdown-element.selected {
  background-color: rgba(59, 130, 246, 0.2);
}

.custom-dropdown-element.selected {
  font-weight: 500;
}

.option-text {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;
  display: block;
}
</style>
