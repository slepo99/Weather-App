<template>
  <div v-if="isSidebarActive" class="overlay" @click="emit('close')"></div>
  <div
    ref="sidebarRef"
    class="app-header__sidebar"
    :class="{ active: isSidebarActive }"
  >
    <div class="app-header__sidebar-content">
      <div class="sidebar-controls">
        <CustomDropdown
          v-model="locale"
          :options="availableLocales"
          width="70px"
        />
        <CustomSwitch
          :isActive="themeStore.isDark"
          @update="themeStore.toggleTheme"
          keepColor
        >
          <template #label-left>
            <CustomIcon name="sun" size="24px" />
          </template>
          <template #label-right>
            <CustomIcon name="moon" size="24px" />
          </template>
        </CustomSwitch>
      </div>
      <Navbar is-vertical/>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomDropdown from "@/components/UI/CustomDropdown.vue";
import CustomSwitch from "@/components/UI/CustomSwitch.vue";
import CustomIcon from "@/components/UI/CustomIcon.vue";
import { useI18n } from "vue-i18n";
import { useThemeStore } from "@/stores/theme";
import Navbar from "./Navbar.vue";
const { locale, availableLocales } = useI18n();
const themeStore = useThemeStore();
const props = withDefaults(
  defineProps<{
    isSidebarActive: boolean;
  }>(),
  {
    isSidebarActive: false,
  },
);

const emit = defineEmits<{
  (e: "close"): void;
}>();
</script>

<style scoped lang="scss">
.app-header__sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 60%;
  max-width: 320px;
  padding: 16px;
  height: 100%;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
  z-index: 999;
}
.active {
  transform: translateX(0) !important;
}
.overlay {
  position: fixed;
  inset: 0;
  background: transparent;
  background: rgba(0, 0, 0, 0.3);
  z-index: 997;
}
.sidebar-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.app-header__sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
}
</style>
