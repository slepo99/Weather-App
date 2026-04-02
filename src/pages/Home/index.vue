<template>
  <div class="home-wrapper">
    <div class="cards-wrapper">
      <div v-for="value in 5" :key="value">
        <WeatherCard
          :weather="{
            city: 'London',
            temperature: 18,
            icon: 'https://openweathermap.org/img/wn/10d@4x.png',

            wind: 5,
            humidity: 60,
            pressure: 1012,

            chart: {
              hourly: {
                labels: [
                  '00:00',
                  '03:00',
                  '06:00',
                  '09:00',
                  '12:00',
                  '15:00',
                  '18:00',
                  '21:00',
                ],
                data: [-2, -4, -6, 3, 12, 15, 9, 4],
              },
              daily: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                data: [10, 12, 8, 14, 11],
              },
            },
          }"
          :isFavorite="false"
          :isChartByHour="chartByHour"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherCard from "@/components/Main/WeatherCard.vue";
import { ref } from "vue";
const chartByHour = ref(false);
// const updateChartMode = (val: boolean) => {
//   chartByHour.value = !val;
//   console.log("Chart mode updated. By hour:", !val);
// };
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
}
.cards-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
