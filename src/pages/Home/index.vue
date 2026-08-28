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
            @removeCityWeather="weatherStore.removeCityWeather(value.id)"
            @toggleFavorite="onToggleFavorite(value)"
          />
        </div>

        <WeatherCardSkeleton v-if="weatherStore.isWeatherLoading" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from "@/components/Main/WeatherCard.vue";
import WeatherCardSkeleton from "@/components/Main/WeatherCardSkeleton.vue";
import { useWeatherStore } from "@/stores/weather";
import { useFavoritesStore } from "@/stores/favorites";
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";
import type { FormattedWeather } from "@/stores/weather/models";
import { useNotification } from "@/composables/useNotification";
import { FAVORITES_TOGGLE_RESULT } from "@/constants/favorites";

const { locale, t } = useI18n();
const weatherStore = useWeatherStore();
const favoritesStore = useFavoritesStore();

function onToggleFavorite(weather: FormattedWeather) {
  const { showNotification } = useNotification();
  const result = favoritesStore.toggleFavorite(weather);
  if (result === FAVORITES_TOGGLE_RESULT.MAX) {
    showNotification(t("favorites.error.maxFavorites"));
  }
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
</style>
