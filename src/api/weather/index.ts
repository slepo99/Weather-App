import api from "..";
import { SEARCH_LIMIT } from "@/constants/api.ts";
import type { ApiCity } from "./models";

const API = {
  CURRENT_WEATHER: "/data/2.5/weather",
  FORECAST: "/data/2.5/forecast",
  GET_CITIES_BY_NAME: "/geo/1.0/direct",
} as const;

export const searchCities = (query: string) => {
  return api.get<ApiCity[]>(API.GET_CITIES_BY_NAME, {
    params: { q: query, limit: SEARCH_LIMIT },
  });
};
