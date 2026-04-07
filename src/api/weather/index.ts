import api from "..";
import axios from "axios";
import { SEARCH_LIMIT, API } from "@/constants/api.ts";
import type { ApiCity, UserCityByIP, WeatherResponse } from "./models";

export function searchCities(query: string) {
  return api.get<ApiCity[]>(API.GET_CITIES_BY_NAME, {
    params: { q: query, limit: SEARCH_LIMIT },
  });
}
export function getWeatherForecast(lat: number, lon: number, lang: string) {
  return api.get<WeatherResponse>(API.GET_FORECAST, {
    params: { lat, lon, lang, units: "metric" },
  });
}
export async function getUserCityByIP(): Promise<UserCityByIP | null> {
  try {
    const { data } = await axios.get(API.GET_USER_CITY_BY_IP);
    if (!data) return null;
    return data as UserCityByIP;
  } catch (err) {
    console.warn("Failed to get user city by IP", err);
    return null;
  }
}
