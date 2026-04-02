// src/layouts/DefaultLayout.vue
<template>
<div class="layout">
  <header class="app-header">
    <div class="container">
      <AppHeader @toggleSidebar="toggleSidebar"/>
      
    </div>
  </header>

  <main>
    <div class="container">
      <slot />
    </div>
  </main>
  <Sidebar :isSidebarActive="isSidebarActive"/>
</div>
</template>
<script setup lang="ts">
import AppHeader from '@/components/AppHeader/index.vue';
import Sidebar from '@/components/AppHeader/Sidebar.vue';
import { ref } from 'vue';
const isSidebarActive = ref(false)


function toggleSidebar() {
  isSidebarActive.value = !isSidebarActive.value
}
</script>