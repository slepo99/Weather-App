<template>
  <div class="home-wrapper">
    <div class="cards-wrapper">
      <div v-for="value in weatherStore.weather" :key="value.city">
        <WeatherCard
          :weather="value"
          :chart="{
            hourly: {
              labels: value.weatherByHours.times,
              data: value.weatherByHours.temps
            },
            daily: {
              labels: value.weatherByDays.days,
              data: value.weatherByDays.temps
            }
          }"
          :isFavorite="value.isFavorite"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from "@/components/Main/WeatherCard.vue";
import { useWeatherStore } from "@/stores/weather"; 
import { useI18n } from "vue-i18n";
import {  onMounted } from "vue";


const { locale } = useI18n();
const weatherStore = useWeatherStore();
onMounted(() => {
  weatherStore.loadUserWeatherByIP(locale.value);
})
</script>

<style scoped lang="scss">
.home-wrapper {
  margin-top: 32px;
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
