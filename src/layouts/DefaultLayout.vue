// src/layouts/DefaultLayout.vue
<template>
  <div class="layout">
   <AppHeader />
    <main class="container">
       <slot />
    </main>
    <!-- <Footer /> -->
  </div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue';
</script>