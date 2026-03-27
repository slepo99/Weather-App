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
        <template #label>
          Додати місто
        </template>
      </CustomBtn>
        <CustomDropdown v-model="selected" :options="['UK', 'EN', 'ENqweqweqweqweqweqweqweqwe']" width="70px"/>

    </div>
    <button @click="themeStore.toggleTheme">Toggle Theme</button>
  </header>
</template>

<script setup lang="ts">
import CustomInput from "@/components/UI/CustomInput.vue";
import { useThemeStore } from "@/stores/theme";
import { useRouter } from "vue-router";
import { ROUTES } from "@/constants/routes";
import { ref } from "vue";
import CustomBtn from "../UI/CustomBtn.vue";
import CustomDropdown from "../UI/CustomDropdown.vue";


const themeStore = useThemeStore();
const router = useRouter();
const searchQuery = ref("");
const arr = ref<string[]>([]);
const selected = ref<string | number>("");
function searchCity(val: string) {
  if (val) {
    arr.value.push('1');
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
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0 0 10px 10px;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
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
</style>
