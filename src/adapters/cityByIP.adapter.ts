import type { UserCityByIP } from "@/api/weather/models";
import type { UserCity } from "@/stores/weather/models";
export function adaptCityByIP(apiCity: UserCityByIP): UserCity {
  return {
    name: apiCity.city,
    lat: apiCity.latitude,
    lon: apiCity.longitude,
    country: apiCity.country_code,
  };
}
