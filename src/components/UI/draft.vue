<template>
  <div class="custom-dropdown-wrapper" ref="wrapperRef">
    <!-- Основная кнопка -->
    <div
      class="custom-dropdown"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
    >
      <span class="selected-text">
        {{ selectedOption ?? placeholder }}
      </span>
      <span class="dropdown-arrow">▼</span>
    </div>

    <!-- Список опций -->
    <div
      :class="{ 'custom-dropdown-options-active': isOpen }"
      class="custom-dropdown-options"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="custom-dropdown-element"
        :class="{ active: option === selectedOption }"
        @click="selectOption(option)"
      >
        {{ option }}
      </div>

      <div v-if="options.length === 0" class="no-options">Нет вариантов</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

const props = defineProps<{
  options: (string | number)[];
  modelValue?: string | number | null;
  placeholder?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string | number | null];
}>();

const wrapperRef = ref<HTMLElement | null>(null);
const isOpen = ref(false);

const selectedOption = ref<string | number | null>(props.modelValue ?? null);

function initDefaultSelection() {
  if (selectedOption.value === null && props.options.length > 0) {
    const firstOption = props.options[0];
    selectedOption.value = firstOption;
    emit("update:modelValue", firstOption);
  }
}

// Следим за изменениями options и modelValue
watch(
  () => props.options,
  () => {
    initDefaultSelection();
  },
  { immediate: true, deep: true },
);

watch(
  () => props.modelValue,
  (newVal) => {
    selectedOption.value = newVal;
  },
);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: string | number) => {
  selectedOption.value = option;
  emit("update:modelValue", option);
  isOpen.value = false;
};

const handleClickOutside = (e: MouseEvent) => {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  initDefaultSelection();

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped lang="scss">
/* Стили оставляем те же, что были в предыдущей версии */
.custom-dropdown-wrapper {
  position: relative;
  width: 100%;
  max-width: 300px;
}

.custom-dropdown {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 32px;
  background-color: var(--btn-bg);
  color: #fff;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
}

.custom-dropdown:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
.custom-dropdown.open {
  border-color: rgba(59, 130, 246, 0.6);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.selected-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-arrow {
  font-size: 12px;
  transition: transform 0.25s ease;
  margin-left: 8px;
}

.custom-dropdown.open .dropdown-arrow {
  transform: rotate(180deg);
}

.custom-dropdown-options {
  position: absolute;
  top: 36px;
  left: 0;
  right: 0;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: $block-shadow;
  padding: 6px 0;
  overflow: hidden;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.25s ease;
  z-index: 100;
  max-height: 240px;
}

.custom-dropdown-options-active {
  transform: scaleY(1);
  overflow-y: auto;
}

.custom-dropdown-element {
  padding: 8px 12px;
  cursor: pointer;
}

.custom-dropdown-element:hover,
.custom-dropdown-element.active {
  background-color: rgba(59, 130, 246, 0.2);
}

.no-options {
  padding: 10px 12px;
  color: #888;
  text-align: center;
  font-size: 13px;
}
</style>
