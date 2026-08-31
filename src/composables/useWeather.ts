import type { FormattedWeather, AutocompleteCity } from "@/stores/weather/models";
export function isSameCity(a: FormattedWeather, b: AutocompleteCity) {
    
  return (
    Math.abs(Number(a.coord.lat) - Number(b.lat)) < 0.15 &&
    Math.abs(Number(a.coord.lon) - Number(b.lon)) < 0.15
  );
}
