
// src/router/index.ts
import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '@/pages/Home/index.vue'
import FavoritesPage from '@/pages/Favorites/index.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/favorites', component: FavoritesPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})