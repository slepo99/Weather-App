import { defineStore } from "pinia";
import type { FavoriteCity, ToggleFavoriteResult } from "./models";
import type { FormattedWeather } from "@/stores/weather/models";
import { useFavoriteCitiesStorage } from "@/services/useFavoriteCitiesStorage";
import { FAVORITES_TOGGLE_RESULT } from "@/constants/favorites";
import { getWeatherForecast } from "@/api/weather";
import { formatWeatherData } from "@/stores/weather/helpers";
interface FavoritesStateModel {
  favoriteCities: FavoriteCity[];
  favoriteCitiesWeather: FormattedWeather[];
  isWeatherLoading: boolean;
}
export const useFavoritesStore = defineStore("favorites", {
  state: (): FavoritesStateModel => ({
    favoriteCities: [],
    favoriteCitiesWeather: [],
    isWeatherLoading: false,
  }),
  getters: {
    isFavorite(state) {
      return (cityId: number) => {
        return state.favoriteCities.some((city) => city.id === cityId);
      };
    },
  },
  actions: {
    setFavoriteCitiesWeather(weather: FormattedWeather) {
      this.favoriteCitiesWeather.push(weather);
    },
    loadFromStorage() {
      this.favoriteCities = useFavoriteCitiesStorage.get();
    },
    saveFavoritesToStorage() {
      useFavoriteCitiesStorage.set(this.favoriteCities);
    },
    toggleFavorite(city: FormattedWeather): ToggleFavoriteResult {
      const index = this.favoriteCities.findIndex((c) => c.id === city.id);
      if (index !== -1) {
        this.favoriteCities.splice(index, 1);
        this.saveFavoritesToStorage();

        return FAVORITES_TOGGLE_RESULT.REMOVED;
      }

      if (this.favoriteCities.length >= 5) {
        return FAVORITES_TOGGLE_RESULT.MAX;
      }

      this.favoriteCities.push({
        id: city.id,
        name: city.city,
        lat: city.coord.lat,
        lon: city.coord.lon,
        country: city.country,
      });

      this.saveFavoritesToStorage();

      return FAVORITES_TOGGLE_RESULT.ADDED;
    },
    removeFavorite(city: FormattedWeather) {
      const index = this.favoriteCities.findIndex((c) => c.id === city.id);
      if (index !== -1) {
        this.favoriteCities.splice(index, 1);
        this.favoriteCitiesWeather = this.favoriteCitiesWeather.filter(
          (w) => w.id !== city.id,
        );
        this.saveFavoritesToStorage();
      }
    },
    async loadFavoriteCitiesWeather(lang: string) {
      this.favoriteCitiesWeather = [];
      this.isWeatherLoading = true;

      try {
        const weather = await Promise.all(
          this.favoriteCities.map(async (city) => {
            const response = await getWeatherForecast(city.lat, city.lon, lang);

            return formatWeatherData(response.data);
          }),
        );

        this.favoriteCitiesWeather = weather;
      } finally {
        this.isWeatherLoading = false;
      }
    },
  },
});
