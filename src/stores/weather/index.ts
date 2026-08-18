import { defineStore } from "pinia";
import {
  searchCities,
  getUserCityByIP,
  getWeatherForecast,
} from "@/api/weather";
import { adaptCities } from "@/adapters/city.adapter";
import { adaptCityByIP } from "@/adapters/cityByIP.adapter";
import type {
  City,
  AutocompleteCity,
  UserCity,
  FormattedWeather,
} from "@/stores/weather/models";
import { formatWeatherData } from "@/stores/weather/helpers";
import { userCityStorage } from "@/services/userCityStorage";
import { getCurrentPosition } from "@/services/geolocation";

interface MainStateModel {
  cities: City[];
  selectedCity: AutocompleteCity | null;
  userCity: UserCity | null;
  weather: FormattedWeather[];
  defaultWeatherLoaded: boolean;
  isCityLoading: boolean;
  isWeatherLoading: boolean;
}

export const useWeatherStore = defineStore("weather", {
  state: (): MainStateModel => {
    return {
      cities: [],
      selectedCity: null,
      userCity: null,
      weather: [],
      defaultWeatherLoaded: false,
      isCityLoading: false,
      isWeatherLoading: false,
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
      userCityStorage.set(city);
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

    async resolveUserCity() {
      let city = userCityStorage.get();
      if (!city) {
        const pos = await getCurrentPosition();
        if (pos) {
          city = adaptCityByIP({
            latitude: pos.lat,
            longitude: pos.lon,
          });
        } else {
          const ipCity = await getUserCityByIP();
          if (ipCity) city = adaptCityByIP(ipCity);
        }
      }
      if (!city) return null;
      this.setUserCity(city);
    },

    async loadWeather(city: AutocompleteCity | UserCity | null, lang: string) {
      if (!city) return;
      this.isWeatherLoading = true;
      try {
        const res = await getWeatherForecast(city.lat, city.lon, lang);
        this.setWeather(formatWeatherData(res.data));
      } finally {
        this.isWeatherLoading = false;
      }
    },

    async loadWeatherByCity(lang: string) {
      if (!this.selectedCity) return;
      await this.loadWeather(this.selectedCity, lang);
    },

    async loadInitialWeather(lang: string) {
      if (this.defaultWeatherLoaded) return;
      this.defaultWeatherLoaded = true;
      await this.resolveUserCity();
      if (!this.userCity) return;

      await this.loadWeather(this.userCity, lang);
    },
  },
});

// // services/userCityStorage.ts
// import { SESSION_STORAGE_KEYS } from "@/constants/localStorage";
// import type { UserCity } from "@/stores/weather/models";

// export const userCityStorage = {
//   get(): UserCity | null {
//     const raw = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_CITY);
//     return raw ? JSON.parse(raw) : null;
//   },

//   set(city: UserCity) {
//     sessionStorage.setItem(
//       SESSION_STORAGE_KEYS.USER_CITY,
//       JSON.stringify(city),
//     );
//   },
// };
// // services/geolocation.ts

// export function getCurrentPosition(): Promise<{ lat: number; lon: number } | null> {
//   return new Promise((resolve) => {
//     navigator.geolocation.getCurrentPosition(
//       ({ coords }) => {
//         resolve({
//           lat: coords.latitude,
//           lon: coords.longitude,
//         });
//       },
//       () => resolve(null),
//     );
//   });
// }
// import { defineStore } from "pinia";
// import {
//   searchCities,
//   getUserCityByIP,
//   getWeatherForecast,
// } from "@/api/weather";

// import { adaptCities } from "@/adapters/city.adapter";
// import { adaptCityByIP } from "@/adapters/cityByIP.adapter";
// import { formatWeatherData } from "@/stores/weather/helpers";

// import { userCityStorage } from "@/services/userCityStorage";
// import { getCurrentPosition } from "@/services/geolocation";

// export const useWeatherStore = defineStore("weather", {
//   state: () => ({
//     cities: [],
//     selectedCity: null,
//     userCity: null,
//     weather: [],
//     isWeatherLoading: false,
//   }),

//   actions: {
//     setUserCity(city) {
//       this.userCity = city;
//       userCityStorage.set(city);
//     },

//     setWeather(data) {
//       this.weather = data;
//     },

//     async loadCities(cityName) {
//       const res = await searchCities(cityName);
//       this.cities = adaptCities(res.data);
//     },

//     async resolveUserCity() {
//       let city = userCityStorage.get();

//       if (!city) {
//         const pos = await getCurrentPosition();

//         if (pos) {
//           city = adaptCityByIP({
//             latitude: pos.lat,
//             longitude: pos.lon,
//           });
//         } else {
//           const ipCity = await getUserCityByIP();
//           if (ipCity) city = adaptCityByIP(ipCity);
//         }
//       }

//       if (!city) return null;

//       this.setUserCity(city);
//       return city;
//     },

//     async loadWeather(city, lang) {
//       if (!city) return;

//       this.isWeatherLoading = true;

//       try {
//         const res = await getWeatherForecast(city.lat, city.lon, lang);
//         this.setWeather(formatWeatherData(res.data));
//       } finally {
//         this.isWeatherLoading = false;
//       }
//     },

//     async loadInitialWeather(lang) {
//       const city = await this.resolveUserCity();
//       if (!city) return;

//       await this.loadWeather(city, lang);
//     },
//   },
// });
