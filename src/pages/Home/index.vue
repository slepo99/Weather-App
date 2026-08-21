<template>
  <div class="home-wrapper">
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
            :isFavorite="value.isFavorite"
            @removeCityWeather="weatherStore.removeCityWeather(value.id)"
            @toggleFavorite="toggleFavorite"
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
import { useI18n } from "vue-i18n";
import { onMounted } from "vue";

const { locale } = useI18n();
const weatherStore = useWeatherStore();

function toggleFavorite(id: number) {
  weatherStore.toggleFavorite(id);
}

onMounted(() => {
  weatherStore.loadInitialWeather(locale.value);
});
</script>

<style scoped lang="scss">
.home-wrapper {
  margin: 32px 0;
  @media (max-width: 900px) {
    margin-top: 26px;
  }
  @media (max-width: 600px) {
    margin-top: 18px;
  }
  @media (max-width: 478px) {
    margin-top: 12px;
  }
}
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
