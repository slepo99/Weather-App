<template>
  <div class="page-wrapper">
    <div class="cards-wrapper">
      <template
        v-if="weatherStore.isWeatherLoading && !weatherStore.weather.length"
      >
        <WeatherCardSkeleton />
      </template>
      <template v-else>
        <div v-for="value in weatherStore.weather" :key="value.id">
          <WeatherCard
            :weather="value"
            :chart="{
              hourly: {
                labels: value.weatherByHours.times,
                data: value.weatherByHours.temps,
              },
              daily: {
                labels: value.weatherByDays.days,
                data: value.weatherByDays.temps,
              },
            }"
            :isFavorite="favoritesStore.isFavorite(value.id)"
            @removeCityWeather="requestRemoveCity(value.id)"
            @toggleFavorite="onToggleFavorite(value)"
          />
        </div>

        <WeatherCardSkeleton v-if="weatherStore.isWeatherLoading" />
      </template>
    </div>
    <CustomModal :isOpen="isRemoveModalOpen" @close="closeRemoveModal">
      <template #title>
        <h3>{{ t("weatherCard.modal.message") }}</h3>
      </template>
      <template #actions="{ close }">
        <div class="city-remove-modal__actions">
          <CustomBtn @click="close" width="60px">
            <template #label>
              {{ t("weatherCard.modal.cancelButton") }}
            </template>
          </CustomBtn>
          <CustomBtn @click="confirmRemoveCity" width="60px">
            <template #label>
              {{ t("weatherCard.modal.confirmButton") }}
            </template>
          </CustomBtn>
        </div>
      </template>
    </CustomModal>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from "@/components/Main/WeatherCard.vue";
import WeatherCardSkeleton from "@/components/Main/WeatherCardSkeleton.vue";
import CustomBtn from "@/components/UI/CustomBtn.vue";
import { useWeatherStore } from "@/stores/weather";
import { useFavoritesStore } from "@/stores/favorites";
import { useI18n } from "vue-i18n";
import { onMounted, ref } from "vue";
import type { FormattedWeather } from "@/stores/weather/models";
import { useNotification } from "@/composables/useNotification";
import { FAVORITES_TOGGLE_RESULT } from "@/constants/favorites";
import CustomModal from "@/components/UI/CustomModal.vue";

const { locale, t } = useI18n();
const weatherStore = useWeatherStore();
const favoritesStore = useFavoritesStore();
const isRemoveModalOpen = ref(false);
const cityIdToRemove = ref<string | null>(null);

function onToggleFavorite(weather: FormattedWeather) {
  const { showNotification } = useNotification();
  const result = favoritesStore.toggleFavorite(weather);
  if (result === FAVORITES_TOGGLE_RESULT.MAX) {
    showNotification(t("favorites.error.maxFavorites"));
  }
}

function requestRemoveCity(cityId: string) {
  cityIdToRemove.value = cityId;
  isRemoveModalOpen.value = true;
}

function confirmRemoveCity() {
  weatherStore.removeCityWeather(cityIdToRemove.value);
  isRemoveModalOpen.value = false;
}

function closeRemoveModal() {
  isRemoveModalOpen.value = false;
}

onMounted(() => {
  weatherStore.loadInitialWeather(locale.value);
  favoritesStore.loadFromStorage();
});
</script>

<style scoped lang="scss">
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.city-remove-modal__actions {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
</style>
