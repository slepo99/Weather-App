<template>
  <div class="input-container" :style="`max-width: ${props.width ? props.width : '300'}px`">
    <input
      :value="modelValue"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
      :disabled="disabled"
      :placeholder="props.label || 'Type something...'"
      type="text"
      class="input-bar"
    />
    <div
      :class="{
        'input-autocomplete-active':
          props.autocompleteData && props.autocompleteData?.length,
      }"
      class="input-autocomplete"
    >
      <div v-for="value in 30" :key="value" class="autocomplite-element">
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  autocompleteData?: string | number[];
  width?: string | number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  position: relative;
  transition: all 0.3s ease;
}
.input-bar {
  background-color: var(--content-bg);
  border: none;
  border-radius: 6px;
  height: 32px;
  max-width: 100%;
  width: 100%;
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: var(--text);
  padding: 0 12px;
  transition: all 0.3s ease;
  z-index: 2;
}
.input-focused {
  box-shadow: $content-shadow;
}
.input-bar::placeholder {
  color: var(--text);
}
.input-bar:focus {
  outline: none;
  box-shadow: $content-shadow;
  transition: all 0.3 ease;
  border: 0px;
}
.input-autocomplete {
  position: absolute;
  top: 30px;
  background-color: var(--content-bg);
  border-radius: 6px;
  box-shadow: $block-shadow;
  padding: 8px 0;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 0.25s ease;
  max-height: 240px;
}
.input-autocomplete-active {
  overflow-y: auto;
  transform: scaleY(1);
}
.autocomplite-element {
  cursor: pointer;
  transition: all 0.2s ease;
  height: 24px;
  padding: 0 8px;
}
.autocomplite-element:hover {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
