<template>
  <div class="card-wrapper">
    <div class="weather-card__header">
      <span class="weather-card__city">London</span>
      <CustomFavoriteToggle
        :isFavorite="isFavorite"
        @toggleFavorite="handleToggleFavorite()"
      />
    </div>
    <CustomDivider />
    <div class="weather-card__info">
      <div class="weather-card__current">
        <CustomIcon
          class="weather-card__icon"
          name="https://openweathermap.org/img/wn/10d@4x.png"
          size="150px"
          alt="weather icon"
        />
        <span class="weather-card__temp">18°C</span>
      </div>
      <CustomDivider vertical />
      <div class="weather-card__details">
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.wind") }} </span>
            <CustomIcon
              class="weather-card__icon"
              name="wind-light"
              size="30px"
              alt="weather icon"
            />
          </div>
          <span>5 м/с</span>
        </div>
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.humidity") }}</span>
            <CustomIcon
              class="weather-card__icon"
              name="humidity-light"
              size="30px"
              alt="weather icon"
            />
          </div>
          <span>60%</span>
        </div>
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.pressure") }}</span>
            <CustomIcon
              class="weather-card__icon"
              name="pressure-light"
              size="30px"
              alt="weather icon"
            />
          </div>
          <span>1012 гПа</span>
        </div>
      </div>
    </div>

    <CustomDivider />
    <div class="weather-card__chart">
      <TemperatureChart
        :labels="['12:00', '13:00', '14:00', '15:00', '16:00']"
        :data="[18, 20, 22, 24, 5]"
      />
      <div class="weather-card__controls">
        <button class="weather-card__toggle">Час/День</button>
        <button class="weather-card__remove">✕</button>
        <CustomBtn>
          <template #icon>
            <CustomIcon name="delete-light" />
          </template>
        </CustomBtn>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomDivider from "../UI/CustomDivider.vue";
import CustomFavoriteToggle from "../UI/CustomFavoriteToggle.vue";
import CustomIcon from "../UI/CustomIcon.vue";
import { useThemeStore } from "@/stores/theme";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import CustomBtn from "../UI/CustomBtn.vue";
import TemperatureChart from "./TemperatureChart.vue";

const { t } = useI18n();
const themeStore = useThemeStore();
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
  padding: 16px;
}
.weather-card__info {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
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
  align-items: center;
  font-size: 28px;
  width: 100%;
  padding: 16px;
}
.weather-card__detail {
  display: flex;
  flex-direction: column;
  gap: 8px;
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
.weather-card__chart {
  width: 100%;
}
</style>
