<template>
  <nav class="app-header__nav">
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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()
const navRoutes = router.options.routes.filter(
  (r): r is typeof r & { meta: { titleKey: string } } => 
    !!r.meta && typeof r.meta.titleKey === 'string'
)
</script>

<style scoped>
.app-header__nav {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-top: 12px;

  /* скрываем скролл */
  scrollbar-width: none;
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
}
</style>
