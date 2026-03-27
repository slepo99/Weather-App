<template>
  <div
    class="switch"
    :class="{
      'switch--active': isActive,
      'switch--select': mode === 'select',
      'switch--disabled': disabled,
    }"
    @click="toggle"
  >
    <div class="switch__track"></div>
    <div class="switch__thumb"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const MODE_TYPES = {
  BOOLEAN: "boolean",
  SELECT: "select",
} as const;
type Mode = "boolean" | "select";
const props = withDefaults(
  defineProps<{
    modelValue: boolean | string;
    mode?: Mode;
    disabled?: boolean;
    options?: [string, string] | [boolean, boolean];
  }>(),
  {
    modelValue: false,
    disabled: false,
    mode: "boolean",
  },
);
const emit = defineEmits(["update:modelValue"]);
const isActive = computed(() => {
  return props.modelValue;
});
function toggle() {
  if (props.mode === MODE_TYPES.SELECT && props.options) {
    const [a, b] = props.options;
    emit("update:modelValue", props.modelValue === a ? b : a);
  } else {
    emit("update:modelValue", !props.modelValue);
  }
}
</script>

<style scoped>
.switch {
  position: relative;
  width: 46px;
  height: 24px;
  cursor: pointer;
}

.switch--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Track */
.switch__track {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.2s;
}

/* Thumb */
.switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: 0.2s;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

/* ===== BOOLEAN ===== */
.switch--active .switch__track {
  background: #85b8b7;
}

.switch--active .switch__thumb {
  transform: translateX(22px);
}

/* ===== SELECT ===== */
/* всегда один цвет */
.switch--select .switch__track {
  background: #018786;
}
</style>
