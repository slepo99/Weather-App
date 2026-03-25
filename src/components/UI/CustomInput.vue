<template>
  <div
    class="input-container"
    ref="containerRef"
    :style="`max-width: ${props.width ? props.width : '300'}px`"
  >
    <input
      :value="modelValue"
      @input="onInput"
      @focus="onFocus"
      :disabled="disabled"
      :placeholder="props.label || 'Type something...'"
      type="text"
      class="input-bar"
    />

    <div
      :class="{ 'input-autocomplete-active': isOpen }"
      class="input-autocomplete"
    >
      <div
        v-for="(value, i) in props.autocompleteData"
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
import { ref, watch, onMounted, onBeforeUnmount } from "vue";

interface Props {
  modelValue: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  autocompleteData?: (string | number)[];
  width?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "selectAutocompleteItem"]);

const containerRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);
const isFocused = ref(false);


const onInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit("update:modelValue", value);
};
const onFocus = () => {
  isFocused.value = true;
  if (props.autocompleteData?.length) {
    isOpen.value = true;
  }
};

function selectItem(val: string | number) {
  emit("selectAutocompleteItem", val);
  emit("update:modelValue", "");
  isOpen.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  if (!containerRef.value) return;

  if (!containerRef.value.contains(event.target as Node)) {
    isOpen.value = false;
    isFocused.value = false;
  }
};

watch(
  () => props.autocompleteData?.length,
  (len) => {
    if (isFocused.value && len) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
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
  z-index: 2;
}

.input-bar:focus {
  outline: none;
  box-shadow: $content-shadow;
  border: 0;
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
</style>