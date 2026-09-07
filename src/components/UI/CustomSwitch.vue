//./src/components/UI/CustomSwitch.vue
<template>
  <div class="switch-wrapper">
    <slot name="label-left">
      <div class="label-left"></div>
    </slot>
    <div
      class="switch"
      :class="{
        'switch--active': isActive,
        'switch--disabled': props.disabled,
        'switch--select': props.keepColor,
      }"
      @click="toggle"
    >
      <div class="switch__track"></div>
      <div class="switch__thumb"></div>
    </div>
    <slot name="label-right">
      <div class="label-right"></div>
    </slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isActive?: boolean;
    disabled?: boolean;
    keepColor?: boolean;
  }>(),
  {
    isActive: false,
    disabled: false,
    keepColor: false,
  },
);
const emit = defineEmits(["update"]);

function toggle() {
  if (props.disabled) return;
  emit("update", !props.isActive);
}
</script>

<style scoped>
.switch-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 6px;
}
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

.switch__track {
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  transition: 0.2s;
}

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

.switch--active .switch__track {
  background: #85b8b7;
}

.switch--active .switch__thumb {
  transform: translateX(22px);
}
.switch--select .switch__track {
  background: #018786;
}
</style>
