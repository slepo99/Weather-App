/app.vue
<template>
  <!-- <input type="text" v-model="cityName" @input="searchCity"> -->
  <DefaultLayout>
     <router-view />
  </DefaultLayout>
</template>
<script setup lang="ts">
// import { ref } from 'vue'
// import { searchCities } from './api/weather'
import DefaultLayout from './layouts/DefaultLayout.vue'

// const cityName = ref('')

// async function searchCity() {
//   if (cityName.value.length > 2) {
//    const response = await searchCities(cityName.value)
//    console.log(response.data)
//    }
//   }

</script>


