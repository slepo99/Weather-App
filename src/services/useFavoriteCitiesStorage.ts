import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import type { FavoriteCity } from "@/stores/favorites/models";

export const useFavoriteCitiesStorage = {
  get(): FavoriteCity[] {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITE_CITIES);
    return raw ? JSON.parse(raw) : [];
  },

  set(favoriteCities: FavoriteCity[]) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITE_CITIES, JSON.stringify(favoriteCities));
  }
};