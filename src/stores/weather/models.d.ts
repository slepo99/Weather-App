export interface City {
  name: string;
  ukName?: string;
  enName?: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
export interface AutocompleteCity {
  name: string;
  lat: number;
  lon: number;
  label: string;
  id: string;
}
export interface UserCity { 
  name: string;
  lat: number;
  lon: number;
  country: string;
}
//--------------------------- Weather data models for client ------------------
export interface WeatherByHours {
  times: string[];
  temps: number[];
}

export interface WeatherByDays {
  days: string[];
  temps: number[];
}

export interface FormattedWeather {
  city: string;
  country: string;

  currentTemp: number;
  currentFeelsLike: number;
  currentDescription: string;
  currentIcon: string;
  currentPop: number;
  currentWind: number;
  currentHumidity: number;
  currentPressure: number;
  id: number;
  weatherByHours: WeatherByHours;
  weatherByDays: WeatherByDays;
}
//---------------------------