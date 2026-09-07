// src/layouts/DefaultLayout.vue
<template>
  <div class="layout">
    <header class="app-header">
      <div class="container">
        <AppHeader
          @toggleSidebar="toggleSidebar"
          :isSidebarActive="isSidebarActive"
        />
      </div>
    </header>

    <main>
      <div class="container">
        <slot />
      </div>
    </main>
    <Sidebar
      v-if="isMobile"
      :isSidebarActive="isSidebarActive"
      @close="closeSidebar"
    />
  </div>
</template>
<script setup lang="ts">
import AppHeader from "@/components/AppHeader/index.vue";
import Sidebar from "@/components/AppHeader/Sidebar.vue";
import { useResponsive } from "@/composables/useResponsive";
import { ref } from "vue";

const { isMobile } = useResponsive();
const isSidebarActive = ref(false);

function toggleSidebar() {
  isSidebarActive.value = !isSidebarActive.value;
}
function closeSidebar() {
  isSidebarActive.value = false;
}
</script>
