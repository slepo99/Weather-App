import { useNotification } from "@/composables/useNotification";
import { useWeatherStore } from "@/stores/weather";
import { isSameCity } from "@/composables/useWeather";
import { MAX_CITIES_QUANTITY } from "@/constants/weather";
import { useI18n } from "vue-i18n";
import { useDebouncedFn } from "@/composables/useDebouncedFn";
import { computed } from "vue";

export function useHeader() {
  const weatherStore = useWeatherStore();
  const { showNotification } = useNotification();
  const { locale, t } = useI18n();

  const cities = computed(() =>
  weatherStore.getCitiesForAutocomplete(locale.value),
);

  const debouncedFetchCities = useDebouncedFn((val: string) => {
    weatherStore.loadCities(val);
  });

  function loadCityWeather() {
    if (weatherStore.weather.length >= MAX_CITIES_QUANTITY) {
      showNotification(t("header.search.error.maxCities"));
      return;
    }
    const selectedCity = weatherStore.selectedCity;
    if (selectedCity) {
      if (weatherStore.weather.some((c) => isSameCity(c, selectedCity))) {
        showNotification(t("header.search.error.cityAlreadyAdded"));
        return;
      }
      weatherStore.loadWeatherByCity(locale.value);
      weatherStore.setSelectedCity(null);
      weatherStore.searchQuery = "";
    }
  }

  function searchCity(val: string) {
    if (val.length) {
      debouncedFetchCities(val);
    } else {
      weatherStore.setCities([]);
      debouncedFetchCities.cancel();
      return;
    }
  }

  return { loadCityWeather, searchCity, cities };
}
