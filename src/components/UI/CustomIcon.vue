<template>
 <div>
   <div class="custom-icon" :style="containerStyle">
    <img
      v-if="isRemote"
      :src="props.name"
      :alt="props.name"
      :style="imageStyle"
      class="icon-image"
    />

    <component
      v-else-if="IconComponent"
      :is="IconComponent"
      :style="svgStyle"
      class="icon-svg"
    />

    <span v-else class="icon-fallback">?</span>
  </div>
 </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";

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

const isRemote = computed(
  () => props.name.startsWith("http://") || props.name.startsWith("https://"),
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
  if (props.size === undefined || props.size === null || props.size === "") return "100%";
  return typeof props.size === "number" ? `${props.size}px` : props.size;
});

const containerStyle = computed(() => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: getSize.value,
  height: getSize.value,
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
</style>
