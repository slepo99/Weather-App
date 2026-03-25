<template>

        <input type="text" placeholder="Search for a city..." class="search-bar" v-model="searchQuery"/>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')
</script>



<style scoped>
.search-bar {
    background-color: rgb(59, 91, 110);
    border: none;
    border-radius: 10px;
    height: 32px;
    max-width: 400px;
    width: 100%;
}
.search-bar:focus {
  outline: none;
}
</style>