/app.vue
<template>
  <DefaultLayout>
     <router-view />
     <CustomNotification />
  </DefaultLayout>
  
</template>
<script setup lang="ts">

import DefaultLayout from './layouts/DefaultLayout.vue'
import CustomNotification from './components/UI/CustomNotification.vue'
</script>


