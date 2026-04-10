<template>
  <div class="card-wrapper">
    <div class="weather-card__header">
      <span class="weather-card__city">{{ `${props.weather.city}, ${props.weather.country}` }}</span>
      <CustomFavoriteToggle
        :isFavorite="isFavorite"
        @toggleFavorite="handleToggleFavorite()"
        @click="console.log('btn pressed')"
      />
    </div>
    <CustomDivider />
    <div class="weather-card__info">
      <div class="weather-card__current">
        <CustomIcon
          class="weather-card__icon-current"
          :name="openWeatherIconUrl(props.weather.currentIcon)"
          alt="weather icon"
        />
        <div class="weather-card__status">
          <span class="weather-card__temp"
          >{{ Math.floor(props.weather.currentTemp) }}°C</span
        >
        <span class="weather-card__weather-state">{{ t(getWeatherKey(props.weather.currentWeatherId)) }}</span>
        </div>
      </div>
      <CustomDivider vertical />
      <div class="weather-card__details">
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.wind") }} </span>
            <CustomIcon
              class="weather-card__icon"
              name="wind-light"
              alt="weather icon"
            />
          </div>
          <span>{{ props.weather.currentWind }} {{ t("weatherCard.windPerSecond") }}</span>
        </div>
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.humidity") }}</span>
            <CustomIcon
              class="weather-card__icon"
              name="humidity-light"
              alt="weather icon"
            />
          </div>
          <span>{{ props.weather.currentHumidity }} %</span>
        </div>
        <div class="weather-card__detail">
          <div>
            <span>{{ t("weatherCard.pressure") }}</span>
            <CustomIcon
              class="weather-card__icon"
              name="pressure-light"
              alt="weather icon"
            />
          </div>
          <span>{{ props.weather.currentPressure }} {{ t("weatherCard.hectopascals") }}</span>
        </div>
      </div>
    </div>

    <CustomDivider />
    <div class="weather-card__chart">
      <TemperatureChart
        :labels="
          isChartByDays ? props.chart.daily.labels : props.chart.hourly.labels
        "
        :data="isChartByDays ? props.chart.daily.data : props.chart.hourly.data"
      />
    </div>
    <CustomDivider />
    <div class="weather-card__controls">
      <CustomSwitch
        :isActive="isChartByDays"
        @update="updateChartMode"
        keepColor
      >
        <template #label-left>
          <span class="weather-card__chart-weitch-label">{{
            t("weatherCard.chart.mode.hour")
          }}</span>
        </template>
        <template #label-right>
          <span class="weather-card__chart-weitch-label">{{
            t("weatherCard.chart.mode.day")
          }}</span>
        </template>
      </CustomSwitch>
      <CustomBtn>
        <template #icon>
          <CustomIcon name="delete-light" size="24px" />
        </template>
      </CustomBtn>
    </div>
                <CustomSkeleton/>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import CustomDivider from "../UI/CustomDivider.vue";
import CustomFavoriteToggle from "../UI/CustomFavoriteToggle.vue";
import CustomIcon from "../UI/CustomIcon.vue";
import CustomBtn from "../UI/CustomBtn.vue";
import TemperatureChart from "./TemperatureChart.vue";
import CustomSwitch from "../UI/CustomSwitch.vue";
import CustomSkeleton from "../UI/CustomSkeleton.vue";
import { openWeatherIconUrl, getWeatherKey } from "../../utils/weather"
const props = defineProps<{
  weather: {
    city: string;
    currentTemp: number;
    currentIcon: string;
    currentWind: number;
    currentHumidity: number;
    currentPressure: number;
    country: string;
    currentWeatherId: number;
  };
  chart: {
    hourly: {
      labels: string[];
      data: number[];
    };
    daily: {
      labels: string[];
      data: number[];
    };
  };
  isFavorite: boolean;
}>();
const isChartByDays = ref(false);

const { t } = useI18n();
const isFavorite = ref(false);
const handleToggleFavorite = () => {
  isFavorite.value = !isFavorite.value;
};
function updateChartMode(val: boolean) {
  isChartByDays.value = val;
  console.log("Chart mode updated. By hour:", val);
}
</script>

<style scoped lang="scss">
.card-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background-color: var(--content-bg);
  padding: 24px;
  border-radius: 10px;
  background-color: var(--content-bg);
  box-shadow: $block-shadow;
  @media (max-width: 900px) {
    padding: 16px;
  }
  @media (max-width: 478px) {
    padding: 12px;
  }
}
.weather-card__header {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.weather-card__info {
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  @media (max-width: 600px) {
    gap: 10px;
  }
  @media (max-width: 478px) {
    flex-direction: column;
    gap: 2px;
    hr {
      display: none;
    }
  }
}
.weather-card__city {
  display: flex;
  width: 100%;
  font-size: 28px;
  font-weight: 700;
  @media (max-width: 600px) {
    font-size: 18px;
  }
}
.weather-card__current {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 30%;
  @media (max-width: 600px) {
    gap: 8px;
  }
  @media (max-width: 478px) {
    width: 100%;
  }
}
.weather-card__icon-current {
  width: 100px;
  height: 100px;
  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
}
.weather-card__temp {
  font-size: 32px;
  font-weight: 700;
  @media (max-width: 600px) {
    font-size: 20px;
  }
}
.weather-card__status {
  display: flex;
  flex-direction: column;
      gap: 8px;
  @media (max-width: 478px) {
    flex-direction: row;
    flex: 1;
    justify-content: space-between;
  }
}
.weather-card__weather-state {
  white-space: nowrap;
    @media (max-width: 478px) {
      font-size: 14px;
    }
}
.weather-card__details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  gap: 6px;
  width: 100%;
  @media (max-width: 600px) {
    font-size: 12px;
  }
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
.weather-card__icon {
  width: 24px;
  height: 24px;
  @media (max-width: 600px) {
    width: 18px;
    height: 18px;
  }
}
.weather-card__chart {
  width: 100%;
}
.weather-card__controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 16px;
}
.weather-card__chart-weitch-label {
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
}
</style>
