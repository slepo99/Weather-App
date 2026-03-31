<template>

    <button
      class="favorite-toggle__button"
      :class="{ active: isFavorite }"
      @click="toggleFavorite"
    >
      ❤
    </button>

</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    isFavorite: boolean;
  }>(),
  {
    isFavorite: false,
  },
);
const emit = defineEmits(["toggle-favorite"]);

function toggleFavorite() {
  emit("toggle-favorite");
}
</script>

<style scoped>
.favorite-toggle__button {
  background: none;
  border: none;
  cursor: pointer;

  font-size: 20px;
  color: #aaa;
  transition: 0.2s;

  &:hover {
    transform: scale(1.2);
  }

  &.active {
    color: #e74c3c;
  }
}
</style>
