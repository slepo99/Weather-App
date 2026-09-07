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
        :placeholder="!selectedItem ? props.label || 'Type something...' : ''"
        type="text"
        class="input-bar"
      />
      <div
        v-if="props.selectMode && selectedItem"
        class="input-selected-content"
      >
        {{ getLabel(selectedItem) }}
      </div>

      <!-- Clear button for input or selected item -->
      <button
        v-if="props.inputValue || selectedItem"
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
        <div @mousedown.left="selectItem(opt)">
          {{ getLabel(opt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends object">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

interface Props {
  inputValue: string
  selectedItem: T | null
  selectMode?: boolean
  options?: T[]
  label?: string
  disabled?: boolean
  width?: string | number
  optionLabel?: keyof T
}

const props = withDefaults(defineProps<Props>(), {
  selectMode: false,
  options: () => [],
  disabled: false,
  width: '100%',
  selectedItem: null,
})

const emit = defineEmits<{
  'update:inputValue': [value: string]
  'update:selectedItem': [value: T | null]
  select: [value: T | null]
}>()

const containerRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isFocused = ref(false)

const isInputDisabled = computed(() => {
  return props.disabled || (props.selectMode && !!props.selectedItem)
})

function onInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  emit('update:inputValue', value)
}

function onFocus() {
  isFocused.value = true
  if (props.options?.length) {
    isOpen.value = true
  }
}

function selectItem(opt: T) {
  emit('select', opt)
  emit('update:inputValue', '')
  emit('update:selectedItem', opt)
  isOpen.value = false
}

function clearInput() {
  if (props.selectedItem) {
    emit('update:selectedItem', null)
    emit('select', null)
  } else {
    emit('update:inputValue', '')
  }
  isOpen.value = false
}

function getLabel(option: T): string {
  if (props.optionLabel) {
    return String(option[props.optionLabel])
  }
  if ('label' in option) {
    return String(option.label)
  }
  return String(option)
}

function handleClickOutside(event: MouseEvent) {
  if (!containerRef.value) return
  if (!containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    isFocused.value = false
  }
}

watch(
  () => props.options?.length,
  (len) => {
    if (isFocused.value && len && props.selectMode) {
      isOpen.value = true
    } else {
      isOpen.value = false
    }
  }
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  display: flex;
  flex-direction: column;
  gap: 6px;
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
  white-space: nowrap;
  width: -webkit-fill-available;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 24px;
}

span {
  font-size: 14px;
}
</style>
