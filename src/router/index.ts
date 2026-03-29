// src/router/index.ts
import { createWebHistory, createRouter } from "vue-router";

import HomePage from "@/pages/Home/index.vue";
import FavoritesPage from "@/pages/Favorites/index.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
    name: "home",
    meta: { titleKey: "nav.home" },
  },
  {
    path: "/favorites",
    component: FavoritesPage,
    name: "favorites",
    meta: { titleKey: "nav.favorites" },
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
