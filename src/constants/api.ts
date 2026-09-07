export const SEARCH_LIMIT = 20;
export const DEBOUNCE_DELAY = 300;

export const API = {
  GET_CURRENT_WEATHER: "/data/2.5/weather",
  GET_FORECAST: "/data/2.5/forecast",
  GET_CITIES_BY_NAME: "/geo/1.0/direct",
  GET_USER_CITY_BY_IP: "https://ipapi.co/json/",
} as const;