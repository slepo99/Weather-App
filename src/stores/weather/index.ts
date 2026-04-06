import { defineStore } from "pinia";
import { searchCities } from "@/api/weather";
import { adaptCities } from "@/adapters/city.adapter";
import type { City, AutocompleteCity } from "@/stores/weather/models";
interface MainStateModel {
  count: number;
  cities: City[];
  autoCompleteCity: AutocompleteCity | null;
}

export const useWeatherStore = defineStore("weather", {
  state: (): MainStateModel => {
    return {
      cities: [],
      count: 0,
      autoCompleteCity: null,
    };
  },
  getters: {
    getCitiesForAutocomplete: (state) =>  (locale: string) => {
      return state.cities.map((city) => {
        const cityName = (locale === "UK" && city.ukName) ? city.ukName : city.enName || city.name;
        return {
          name: cityName,
          lat: city.lat,
          lon: city.lon,
          label: `${cityName}, ${city.state ? city.state + ", " : ''} ${city.country ? city.country : ''}`,
          id: `${city.lat}-${city.lon}`
        };
      });
    },
  },
  actions: {
    setSelectedCity(city: AutocompleteCity | null) {
      this.autoCompleteCity = city;
    },
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
