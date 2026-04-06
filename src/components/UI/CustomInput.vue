<template>
  <div
    class="input-container"
    ref="containerRef"
    :style="`width: ${props.width}`"
  >
    <div class="input-wrapper">
      <!-- Main input field -->
      <input
        :value="props.inputValue"
        @input="onInput"
        @focus="onFocus"
        :disabled="isInputDisabled"
        :placeholder="!props.selectedItem ? props.label || 'Type something...' : ''"
        type="text"
        class="input-bar"
      />
      <div
        v-if="props.selectMode && props.selectedItem"
        class="input-selected-content"
      >
        {{ getLabel(props.selectedItem) }}
      </div>

      <!-- Clear button for input or selected item -->
      <button
        v-if="props.inputValue || props.selectedItem"
        type="button"
        class="input-clear-btn"
        @click="clearInput"
      >
        ✕
      </button>
    </div>

    <!-- Autocomplete dropdown -->
    <div
      v-if="props.selectMode"
      :class="{ 'input-autocomplete-active': isOpen }"
      class="input-autocomplete"
    >
      <div
        v-for="(opt, i) in props.options"
        :key="i"
        class="autocomplite-element"
      >
        <div @mousedown="selectItem(opt)">
          {{ getLabel(opt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

type Option = any;

interface Props {
  inputValue: string;
  selectMode?: boolean;
  selectedItem?: any;
  options?: Option[];
  label?: string;
  error?: string;
  disabled?: boolean;
  width?: string | number;
  optionLabel?: string;
  optionValue?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectMode: false,
  options: () => [],
  disabled: false,
  width: "100%",
});

const emit = defineEmits<{
  "update:inputValue": [string];
  select: [any];
}>();

const containerRef = ref<HTMLElement | null>(null);

const isOpen = ref(false);      // Dropdown open state
const isFocused = ref(false);   // Input focus state

// Computed to disable input if selectMode is active and item is selected
const isInputDisabled = computed(function () {
  return props.disabled || (props.selectMode && !!props.selectedItem);
});


// Emit input value changes
function onInput(event: Event): void {
  const value = (event.target as HTMLInputElement).value;
  emit("update:inputValue", value);
}

// Open dropdown on input focus if options exist
function onFocus(): void {
  isFocused.value = true;
  if (props.options?.length) {
    isOpen.value = true;
  }
}

// Select an option from dropdown
function selectItem(opt: Option): void {
  emit("select", getValue(opt));       // Emit selected value
  emit("update:inputValue", "");       // Clear input
  isOpen.value = false;                // Close dropdown
}

// Clear input or selected item
function clearInput(): void {
  if (props.selectedItem) {
    emit("select", null);              // Deselect item
  } else {
    emit("update:inputValue", "");     // Clear input value
  }
  isOpen.value = false;                // Close dropdown
}

// Get display label for an option
function getLabel(opt: Option): string {
  if (!opt) return "";

  if (props.optionLabel && typeof opt === "object") {
    return opt[props.optionLabel];
  }

  if (typeof opt === "object" && "label" in opt) {
    return opt.label;
  }

  // For primitive values
  return String(opt);
}

// Get internal value for an option
function getValue(opt: Option) {
  if (!opt) return null;

  if (props.optionValue && typeof opt === "object") {
    return opt[props.optionValue];
  }

  if (typeof opt === "object" && "value" in opt) {
    return opt.value;
  }

  // For primitive values
  return opt;
}

// Close dropdown when clicking outside of the component
function handleClickOutside(event: MouseEvent): void {
  if (!containerRef.value) return;
  const input = containerRef.value.querySelector("input");
  if (!containerRef.value.contains(event.target as Node) &&
      document.activeElement !== input) {
    isOpen.value = false;
    isFocused.value = false;
  }
}

// Automatically open/close dropdown when options change
watch(
  () => props.options?.length,
  function (len) {
    if (isFocused.value && len && props.selectMode) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
);

// Add/remove document click listener
onMounted(function () {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(function () {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  position: relative;
}

.input-bar {
  background-color: var(--content-bg);
  border-radius: 6px;
  height: 32px;
  width: 100%;
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: var(--text);
  padding: 0 12px;
  z-index: 3;
}

.input-bar:focus {
  outline: none;
  box-shadow: $content-shadow;
  border: 0;
}

.input-wrapper {
  position: relative;
  width: 100%;
  z-index: 3;
}

.input-autocomplete {
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

.input-autocomplete-active {
  transform: scaleY(1);
  overflow-y: auto;
}

.autocomplite-element {
  cursor: pointer;
  height: 24px;
  padding: 0 8px;
}

.autocomplite-element:hover {
  background-color: rgba(59, 130, 246, 0.2);
}

.input-clear-btn {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  color: rgba(59, 130, 246, 0.7);
  padding: 0;
  z-index: 3;
}

.input-selected-content {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text);
}

span {
  font-size: 14px;
}
</style>