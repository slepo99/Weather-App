<template>
  <div class="page-wrapper">
    <div class="cards-wrapper">
      <template
        v-if="
          favoritesStore.isWeatherLoading &&
          !favoritesStore.favoriteCitiesWeather.length
        "
      >
        <WeatherCardSkeleton />
      </template>
      <template v-else>
        <div
          v-for="value in favoritesStore.favoriteCitiesWeather"
          :key="value.id"
        >
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
            @removeCityWeather="onToggleFavorite(value)"
            @toggleFavorite="onToggleFavorite(value)"
          />
        </div>

        <WeatherCardSkeleton v-if="favoritesStore.isWeatherLoading" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useFavoritesStore } from "@/stores/favorites";
import { useI18n } from "vue-i18n";
import type { FormattedWeather } from "@/stores/weather/models";
import WeatherCard from "@/components/Main/WeatherCard.vue";
import WeatherCardSkeleton from "@/components/Main/WeatherCardSkeleton.vue";
const favoritesStore = useFavoritesStore();
const { locale } = useI18n();

function onToggleFavorite(weather: FormattedWeather) {
  favoritesStore.removeFavorite(weather);
}

onMounted(() => {
  favoritesStore.loadFromStorage();
  favoritesStore.loadFavoriteCitiesWeather(locale.value);
});
</script>

<style scoped>
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
