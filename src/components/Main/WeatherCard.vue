<template>
  <div class="card-wrapper">
     <div class="weather-card__header">
      <span class="weather-card__city">London</span>
      <CustomFavoriteToggle :isFavorite="isFavorite" @toggleFavorite="handleToggleFavorite()" />
    </div>
    <CustomDivider/>
     <div class="weather-card__current">
      <CustomIcon class="weather-card__icon" name="https://openweathermap.org/img/wn/10d@4x.png" size="150px" alt="weather icon" />
      <span class="weather-card__temp">18°C</span>
    </div>
        <CustomDivider/>
    <div class="weather-card__details">
      <div class="weather-card__detail">{{ t('weatherCard.wind') }}: 5 м/с</div>
      <div class="weather-card__detail">{{ t('weatherCard.humidity') }}: 60%</div>
      <div class="weather-card__detail">{{ t('weatherCard.pressure') }}: 1012 гПа</div>
    </div>
        <CustomDivider/>
    <div class="weather-card__chart">

      <canvas class="weather-card__canvas"></canvas>
      <div class="weather-card__controls">
        <button class="weather-card__toggle">Час/День</button>
        <button class="weather-card__remove">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomDivider from '../UI/CustomDivider.vue';
import CustomFavoriteToggle from '../UI/CustomFavoriteToggle.vue';
import CustomIcon from '../UI/CustomIcon.vue';
import { useI18n } from 'vue-i18n'
import { ref } from 'vue';
const { t } = useI18n()
const isFavorite = ref(false);
const handleToggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--content-bg);
  padding: 16px;
  border-radius: 10px;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
}
.weather-card__header {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
}
.weather-card__city {
    display: flex;
    width: 100%;
    font-size: 32px;
    font-weight: 700;
}
.weather-card__current {
    display: flex;
    align-items: center;
    gap: 16px;
}
.weather-card__temp {
    font-size: 32px;
    font-weight: 500;
}
.weather-card__details {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    width: 100%;
}
</style>
