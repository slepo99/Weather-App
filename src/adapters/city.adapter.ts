import type { ApiCity } from "@/api/weather/models";
import type { City } from "@/stores/weather/models";

export function adaptCity(apiCity: ApiCity): City {
  return {
    name: apiCity.name,
    ukName: apiCity.local_names?.uk,
    enName: apiCity.local_names?.en,
    lat: apiCity.lat,
    lon: apiCity.lon,
    country: apiCity.country,
    state: apiCity.state,
  };
}

export function adaptCities(apiCities: ApiCity[]): City[] {
  return apiCities.map(adaptCity);
}