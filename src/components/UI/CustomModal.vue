<template>
  <Transition name="modal">
    <div v-if="props.isOpen" class="custom-modal" @click.self="close">
      <div class="custom-modal__content">
        <slot name="title"></slot>
        <slot name="description"></slot>
        <slot name="actions" :close="close" :submit="submit"></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">

const emit = defineEmits<{
  (e: "close"): [];
  (e: "submit"): [];
}>();

const props = withDefaults(defineProps<{
  isOpen: boolean;
}>(), {
  isOpen: false,
});

function close() {
  emit("close");
}
function submit() {
  emit("submit");
}
</script>

<style scoped lang="scss">
.custom-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0 0 0 / 50%);
}

.custom-modal__content {
  background-color: var(--content-bg);
  border-radius: 8px;
  box-shadow: $block-shadow;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
