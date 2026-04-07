import { defineStore } from "pinia";
import {
  searchCities,
  getUserCityByIP,
  getWeatherForecast,
} from "@/api/weather";
import { adaptCities } from "@/adapters/city.adapter";
import { adaptCityByIP } from "@/adapters/cityByIP.adapter";
import { SESSION_STORAGE_KEYS } from "@/constants/localStorage";
import type {
  City,
  AutocompleteCity,
  UserCity,
  FormattedWeather,
} from "@/stores/weather/models";
import { formatWeatherData } from "@/stores/weather/helpers";
interface MainStateModel {
  cities: City[];
  selectedCity: AutocompleteCity | null;
  userCity: UserCity | null;
  weather: FormattedWeather[];
  defaultWeatherLoaded: boolean;
}

export const useWeatherStore = defineStore("weather", {
  state: (): MainStateModel => {
    return {
      cities: [],
      selectedCity: null,
      userCity: null,
      weather: [],
      defaultWeatherLoaded: false,
    };
  },
  getters: {
    getCitiesForAutocomplete:
      (state) =>
      (locale: string): AutocompleteCity[] => {
        return state.cities.map((city) => {
          const cityName =
            locale === "UK" && city.ukName
              ? city.ukName
              : city.enName || city.name;
          return {
            name: cityName,
            lat: city.lat,
            lon: city.lon,
            label: `${cityName}, ${city.state ? city.state + ", " : ""} ${city.country ? city.country : ""}`,
            id: `${city.lat}-${city.lon}`,
          };
        });
      },
  },
  actions: {
    setWeather(weather: FormattedWeather) {
      this.weather.push(weather);
    },
    setUserCity(city: UserCity) {
      this.userCity = city;
    },
    setSelectedCity(city: AutocompleteCity | null) {
      this.selectedCity = city;
    },
    setCities(cities: City[]) {
      this.cities = cities;
    },
    async loadCities(cityName: string) {
      const response = await searchCities(cityName);
      const adaptedCities = adaptCities(response.data);
      this.setCities(adaptedCities);
    },
    async loadUserCityByIP() {
      const cached = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_CITY);
      if (cached) {
        this.setUserCity(JSON.parse(cached));
        return;
      }
      const userCity = await getUserCityByIP();
      if (!userCity) return;
      const adaptedCity = adaptCityByIP(userCity);
      this.setUserCity(adaptedCity);
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.USER_CITY,
        JSON.stringify(adaptedCity),
      );
    },
    async loadUserWeatherByIP(lang: string) {
      if (this.defaultWeatherLoaded) return;

      this.defaultWeatherLoaded = true;
      await this.loadUserCityByIP();

      if (!this.userCity) return;
      try {
        const weatherResponse = await getWeatherForecast(
          this.userCity!.lat,
          this.userCity!.lon,
          lang,
        );
        const data = formatWeatherData(weatherResponse.data);

        this.setWeather(data);
      } catch (e) {
        console.error(e);
        this.defaultWeatherLoaded = false;
      }
    },
  },
});
