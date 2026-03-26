<template>
  <div>
    <img v-if="isRemote" :src="remoteUrl" />
    <img v-else-if="isLocal && localUrl" :src="localUrl" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    color?: string;
  }>(),
  {
    size: 24,
    color: "currentColor",
  },
);

const isRemote = computed(() => {
  return props.name.startsWith("http://") || props.name.startsWith("https://");
});
const remoteUrl = computed(() => (isRemote.value ? props.name : ""));
const isLocal = computed(() => !isRemote.value && !!props.name);

const localUrl = computed(() => {
  if (!isLocal.value) return "";
  try {
    return new URL(`/src/assets/icons/${props.name}.svg`, import.meta.url).href;
  } catch (err) {
    console.warn(`[AppIcon] Local icon not found: ${props.name}.svg`);
    return "";
  }
});
</script>

<style scoped></style>
