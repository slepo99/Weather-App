<template>
  <div class="home-wrapper">
    <div class="cards-wrapper">
      <div v-for="value in 5" :key="value"><WeatherCard /></div>
    </div>
  </div>    
</template>

<script setup lang="ts">
import WeatherCard from "@/components/Main/WeatherCard.vue";
</script>

<style scoped lang="scss">
.home-wrapper {
  margin-top: 24px;
}
.cards-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
</style>
