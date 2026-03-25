<template>
  <div
    class="input-container"
    ref="containerRef"
    :style="`max-width: ${props.width ? props.width : '300'}px`"
  >
    <div class="input-wrapper">
      <input
        :value="inputValue"
        @input="onInput"
        @focus="onFocus"
        :disabled="isInputDisabled"
        :placeholder="!selectedItem ? props.label || 'Type something...' : ''"
        type="text"
        class="input-bar"
      />
      <div class="input-selected-content">
        <span v-if="selectedItem">{{ selectedItem }}</span>
      </div>
      <button
        v-if="inputValue || selectedItem"
        type="button"
        class="input-clear-btn"
        @click="clearInput"
      >
        ✕
      </button>
    </div>
    <div
      :class="{ 'input-autocomplete-active': isOpen }"
      class="input-autocomplete"
    >
      <div
        v-for="(value, i) in props.options"
        :key="i"
        class="autocomplite-element"
      >
        <div @mousedown="selectItem(value)">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";

interface Props {
  inputValue: string;
  selectedItem?: string | number;
  options?: (string | number)[];
  label?: string;
  error?: string;
  disabled?: boolean;
  width?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:inputValue", "update:selectedItem"]);

const containerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const isFocused = ref(false);
const isInputDisabled = computed(() => {
  return props.disabled || !!props.selectedItem;
});

const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:inputValue", value);
};
const onFocus = () => {
  isFocused.value = true;
  if (props.options?.length) {
    isOpen.value = true;
  }
};

function selectItem(val: string | number) {
  emit("update:selectedItem", val);
  emit("update:inputValue", "");
  isOpen.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  if (!containerRef.value) return;

  if (!containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
    isFocused.value = false;
  }
};
function clearInput() {
  if (props.selectedItem) {
    emit("update:selectedItem", "");
  } else {
    emit("update:inputValue", "");
  }
  isOpen.value = false;
}
watch(
  () => props.options?.length,
  (len) => {
    if (isFocused.value && len) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  },
);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
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
</style>
