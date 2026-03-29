// src/layouts/DefaultLayout.vue
<template>
<div class="layout">
  <header>
    <div class="container">
      <AppHeader />
    </div>
  </header>

  <main>
    <div class="container">
      <slot />
    </div>
  </main>
</div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue';
</script>