import { defineStore } from "pinia";
import { searchCities } from "@/api/weather";
import { adaptCities } from "@/adapters/city.adapter";
import type { City } from "@/stores/weather/models";
interface MainStateModel {
  count: number;
  cities: City[];
}
export const useWeatherStore = defineStore("weather", {
  state: (): MainStateModel => {
    return {
      cities: [],
      count: 0,
    };
  },
  getters: {
    getCitiesForAutocomplete: (state) => {
      return state.cities.map((city) => {
        const country = city.country ? `, ${city.country}` : "";
        const state = city.state ? `, ${city.state}` : "";
        return `${city.name}${state}${country}`;
      });
    },
  },
  actions: {
    setCities(cities: City[]) {
      this.cities = cities;
    },
    async loadCities(cityName: string) {
      const response = await searchCities(cityName);
      const adaptedCities = adaptCities(response.data);
      this.setCities(adaptedCities);
    },
  },
});
