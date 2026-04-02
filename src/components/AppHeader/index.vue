// src/components/AppHeader/index.vue
<template>
  <header class="app-header">
    <div class="app-header__top">
      <div class="app-header__left">
        <div class="app-logo">
          <img
            src="../../assets/images/app-logo.png"
            alt="App Logo"
            class="app-logo__image"
          />
          <span class="app-logo__title">Weather App</span>
        </div>
        <div
          v-if="isDesktopSearchVisible"
          class="app-header__search"
        >
          <CustomInput
            v-model:inputValue="searchQuery"
            selectMode
            :options="arr"
            :selectedItem="selectedCity"
            @update:inputValue="searchCity"
            @select="selectCity"
            class="app-header__search-input"
          />

          <CustomBtn>
            <template #label> Додати місто </template>
          </CustomBtn>
        </div>
      </div>
      <div v-if="!isMobile" class="app-header__right">
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
    </div>
    <CustomDivider class="app-header__divider" />
    <div class="app-header__bottom">
      <div v-if="isMobileSearchVisible" class="app-header__search" id="search-mobile">
        <CustomInput
          v-model:inputValue="searchQuery"
          selectMode
          :options="arr"
          :selectedItem="selectedCity"
          @update:inputValue="searchCity"
          @select="selectCity"
          class="app-header__search-input"
        />

        <CustomBtn :is-loading="true">
          <template #icon><CustomIcon name="moon" size="24px" /></template>
          <template #label> Додати місто </template>
        </CustomBtn>
      </div>
      <Navbar v-if="!isMobile"/>
      <button @click="toggleSidebar">Toggle Sidebar</button>
    </div>
    
  </header>
</template>

<script setup lang="ts">
import CustomInput from "@/components/UI/CustomInput.vue";
import { useThemeStore } from "@/stores/theme";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";
import { ref, computed } from "vue";
import CustomBtn from "../UI/CustomBtn.vue";
import CustomDropdown from "../UI/CustomDropdown.vue";
import CustomSwitch from "../UI/CustomSwitch.vue";
import CustomIcon from "../UI/CustomIcon.vue";
import CustomDivider from "../UI/CustomDivider.vue";
import Navbar from "./Navbar.vue";
import { useResponsive } from "@/composables/useResponsive";

import { useI18n } from "vue-i18n";
const emit = defineEmits<{
  "toggleSidebar": [];
}>();
const { isMiniDesktop, isMobile, isTablet } = useResponsive();
const { locale, availableLocales } = useI18n();

const themeStore = useThemeStore();
const router = useRouter();
const searchQuery = ref("");
const arr = ref<string[]>([]);

function toggleSidebar() {
  emit("toggleSidebar");
}

const isDesktopSearchVisible = computed(() => {
  return (!isMiniDesktop.value && !isTablet.value && !isMobile.value) && router.currentRoute.value.fullPath === ROUTES.HOME
});
const isMobileSearchVisible = computed(() => {
  return (isMiniDesktop.value || isTablet.value || isMobile.value) && router.currentRoute.value.fullPath === ROUTES.HOME
});
function searchCity(val: string) {
  if (val) {
    arr.value.push(val);
  } else {
    arr.value = [];
  }
}
const selectedCity = ref("");
function selectCity(val: string | number | null) {
  selectedCity.value = val as string;
}
</script>

<style scoped lang="scss">
.app-header {
  background-color: var(--content-bg);
  // height: 60px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
  @media (max-width: 900px) {
    padding: 16px;
  }
}
.app-header__top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  // @media (max-width: 1024px) {
  //   align-items: flex-start;
  // }
}
.app-header__search {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  @media (max-width: 478px) {
    flex-direction: column;
    button {
      width: 100%;
    }
  }
}
.app-header__search-input {
  max-width: 300px;
   @media (max-width: 600px) {
    max-width: 100%;
  }
}
.app-header__left {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 24px;
  // @media (max-width: 1024px) {
  //   flex-direction: column;
  //   align-items: unset;
  //   gap: 12px;
  // }
}
.app-header__right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.app-logo {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
}
.app-logo__image {
  width: 40px;
  height: 40px;
    @media (max-width: 600px) {
     width: 34px;
      height: 34px;
  }
}
.app-logo__title {
  font-size: 32px;
  font-weight: 700;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 24px;
  }
}
.custom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.app-header__divider {
  width: 100%;
  margin: 12px 0;
}
.app-header__bottom {
  width: 100%;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    align-items: unset;
    gap: 12px;
  }
}
</style>
