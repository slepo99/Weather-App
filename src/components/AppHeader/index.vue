<template>
  <header class="container app-header">
    <div class="app-header__left">
      <div class="app-logo">
        <img
          src="../../assets/images/app-logo.png"
          alt="App Logo"
          class="app-logo__image"
        />
        <span class="app-logo__title">Weather App</span>
      </div>
      <SearchBar v-if="router.currentRoute.value.fullPath === ROUTES.HOME" />
    </div>
    <button @click="themeStore.toggleTheme">Toggle Theme</button>
  </header>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import { useThemeStore } from "@/stores/theme";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";
const themeStore = useThemeStore();
const router = useRouter();
</script>

<style scoped lang="scss">
.app-header {
  background-color: var(--content-bg);
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  background-color: var(--content-bg);
  box-shadow: $content-shadow;
}
.app-header__left {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 24px;
}
.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}
.app-logo__image {
  width: 40px;
  height: 40px;
}
.app-logo__title {
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;
}
</style>
