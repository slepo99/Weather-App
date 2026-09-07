<template>
  <div class="custom-icon" :style="containerStyle">
    <div v-if="isRemote" class="icon-remote">
      <CustomLoadrer v-if="isLoading && !hasError" :width="imageStyle.width" />

      <img
        v-show="!isLoading && !hasError"
        :src="props.name"
        :alt="props.name"
        :style="imageStyle"
        @load="isLoading = false"
        @error="hasError = true"
        class="icon-image"
      />

      <span v-if="hasError" class="icon-fallback">?</span>
    </div>

    <component
      v-else-if="IconComponent"
      :is="IconComponent"
      :style="svgStyle"
      class="icon-svg"
    />

    <span v-else class="icon-fallback">?</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref, watch } from "vue";
import CustomLoadrer from "./CustomLoader.vue";

const props = withDefaults(
  defineProps<{
    name: string;
    size?: string | number;
    backgroundColor?: string;
    color?: string;
  }>(),
  {
    backgroundColor: "transparent",
    color: "var(--icon)",
  },
);

const isLoading = ref(true);
const hasError = ref(false);

const isRemote = computed(
  () => props.name.startsWith("http://") || props.name.startsWith("https://"),
);

watch(
  () => props.name,
  () => {
    isLoading.value = true;
    hasError.value = false;
  },
  { immediate: true },
);

const IconComponent = computed(() => {
  if (isRemote.value || !props.name) return null;

  return defineAsyncComponent(() =>
    import(`../../assets/icons/${props.name}.svg`).catch((err) => {
      console.warn(`[CustomIcon] Icon not found: ${props.name}.svg`, err);

      return { render: () => null };
    }),
  );
});

const getSize = computed(() => {
  if (props.size === undefined || props.size === null || props.size === "") {
    return "100%";
  }

  return typeof props.size === "number" ? `${props.size}px` : props.size;
});

const containerStyle = computed(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: props.backgroundColor,
  borderRadius: "50%",
}));

const imageStyle = computed(() => ({
  width: getSize.value,
  height: getSize.value,
  objectFit: "contain" as const,
}));

const svgStyle = computed(() => ({
  width: getSize.value,
  height: getSize.value,
  fill: props.color,
}));
</script>

<style scoped>
.custom-icon {
  line-height: 0;
}

.icon-svg {
  display: block;
}

.icon-image {
  display: block;
}

.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0.6;
}
.icon-remote {
  width: 100%;
}
</style>
