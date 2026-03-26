<template>
  <div class="custom-icon" :style="containerStyle">
    <img
      v-if="isRemote"
      :src="remoteUrl"
      :alt="props.name"
      :style="imageStyle"
      class="icon-image"
    />
    <img
      v-else-if="isLocal && localUrl"
      :src="localUrl"
      :alt="props.name"
      :style="imageStyle"
      class="icon-image"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    backgroundColor?: string;
  }>(),
  {
    size: 24,
    backgroundColor: "transparent",
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

const containerStyle = computed(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: getSize.value,
  height: getSize.value,
  backgroundColor: props.backgroundColor,
}));
const imageStyle = computed(() => ({
  width: getSize.value,
  height: getSize.value,
  objectFit: "contain" as const,
}));

const getSize = computed(() => {
  if (typeof props.size === "number") return `${props.size}px`;
  return props.size || "20px";
});
</script>

<style scoped>
.custom-icon {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
</style>
