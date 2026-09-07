<template>
  <nav class="app-header__nav" :style="navStyles">
    <router-link
      v-for="route in navRoutes"
      :key="route.path"
      :to="route.path"
      class="nav-item"
      active-class="nav-item--active"
    >
      {{ t(route.meta.titleKey) }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { CSSProperties } from 'vue';

const props = withDefaults(
  defineProps<{
    isVertical?: boolean;
  }>(),
  {
    isVertical: false,
  },
);

const { t } = useI18n();
const router = useRouter();
const navRoutes = router.options.routes.filter(
  (r): r is typeof r & { meta: { titleKey: string } } =>
    !!r.meta && typeof r.meta.titleKey === "string",
);
const navStyles = computed<CSSProperties>(() => ({
  flexDirection: props.isVertical ? "column" : "row",
}));
</script>

<style scoped lang="scss">
.app-header__nav {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;
  width: fit-content;
}
.app-header__nav::-webkit-scrollbar {
  display: none;
}
.nav-item {
  white-space: nowrap;
  flex-shrink: 0;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 24px;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: all 300ms ease;
  position: relative;
  @media (max-width: 900px) {
    font-size: 18px;
    padding: 4px 8px;
  }
}
.nav-item:hover {
  color: color-mix(in srgb, var(--btn-bg) 90%, black);
}
.nav-item::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: var(--btn-bg);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}
.nav-item--active::after {
  transform: scaleX(1);
}
</style>
