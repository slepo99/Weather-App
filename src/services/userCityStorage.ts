import { SESSION_STORAGE_KEYS } from "@/constants/localStorage";
import type { UserCity } from "@/stores/weather/models";

export const userCityStorage = {
  get(): UserCity | null {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEYS.USER_CITY);
    return raw ? JSON.parse(raw) : null;
  },

  set(city: UserCity) {
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.USER_CITY,
      JSON.stringify(city),
    );
  },
};