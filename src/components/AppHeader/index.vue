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
        <CustomInput
          v-if="router.currentRoute.value.fullPath === ROUTES.HOME"
          v-model:inputValue="searchQuery"
          :selectMode="true"
          :options="arr"
          :selectedItem="selectedCity"
          @update:inputValue="searchCity"
          @update:selectedItem="selectCity"
        />

        <CustomBtn>
          <template #label> Додати місто </template>
        </CustomBtn>
      </div>
      <div class="app-header__right">
        <CustomDropdown
          v-model="locale"
          :options="availableLocales"
          width="70px"
        />
        <CustomSwitch
          :modelValue="themeStore.isDark"
          @change="themeStore.toggleTheme"
          keepColor
        >
          <template #label-left>
            <CustomIcon name="sun" />
          </template>
          <template #label-right>
            <CustomIcon name="moon" />
          </template>
        </CustomSwitch>
      </div>
    </div>
    <CustomDivider class="app-header__divider"/>
    <div class="app-header__bottom">
      <Navbar/>
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

import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()

const themeStore = useThemeStore();
const router = useRouter();
const searchQuery = ref("");
const arr = ref<string[]>([]);
const selected = ref<string | number>("");



function searchCity(val: string) {
  if (val) {
    arr.value.push("1");
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
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
}
.app-header__top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.app-header__left {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 24px;
}
.app-header__right {
  display: flex;
  align-items: center;
  gap: 24px;
}
.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
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
.custom-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
.app-header__divider {
  width: 100%;
  margin: 16px 0;
}
</style>
