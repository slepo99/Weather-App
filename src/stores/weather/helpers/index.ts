import type { WeatherResponse } from "@/api/weather/models";
export function formatWeatherData(data: WeatherResponse) {
  const now = Date.now() / 1000;
  const next24h = now + 24 * 3600;

  const weatherByHoursRaw = data.list
    .filter(item => item.dt >= now && item.dt <= next24h);

  const weatherByHours = {
    times: weatherByHoursRaw.map(item =>
      item.dt_txt.split(' ')[1].slice(0, 5)
    ),
    temps: weatherByHoursRaw.map(item => item.main.temp),
  };

  const daysObj: Record<string, number[]> = {};

  for (const item of data.list) {
    const day = item.dt_txt.split(' ')[0];
    if (!daysObj[day]) daysObj[day] = [];
    daysObj[day].push(item.main.temp);
  }

  const weatherByDaysRaw = Object.entries(daysObj).map(([day, temps]) => ({
    day,
    temp: temps.reduce((a, b) => a + b, 0) / temps.length,
  }));

  const weatherByDays = {
    days: weatherByDaysRaw.map(item => item.day),
    temps: weatherByDaysRaw.map(item => item.temp),
  };

  return {
    city: data.city.name,
    country: data.city.country,

    currentTemp: data.list[0].main.temp,
    currentFeelsLike: data.list[0].main.feels_like,
    currentDescription: data.list[0].weather[0]?.description ?? "",
    currentIcon: data.list[0].weather[0]?.icon ?? "",
    currentPop: data.list[0].pop,
    currentWind: data.list[0].wind.speed,
    currentHumidity: data.list[0].main.humidity,
    currentPressure: data.list[0].main.pressure,
    id: data.city.id,
    isFavorite: false,
    weatherByHours,
    weatherByDays,
  };
}