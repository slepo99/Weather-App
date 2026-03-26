<template>
  <button @click="handleClick" class="custom-btn">
    <div>
      <slot name="icon"> </slot>
    </div>
    <div>
      <slot name="label"> </slot>
    </div>
  </button>
</template>

<script setup lang="ts">
interface Props {
  color?: string;
}
const props = defineProps<Props>();

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click");
};
</script>

<style scoped></style>
