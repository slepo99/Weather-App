export function openWeatherIconUrl(icon: string, size: string = "2x") {
  return `https://openweathermap.org/payload/api/media/file/${icon}.png`;
}

export function getWeatherKey(id: number): string {
  // Thunderstorm
  if (id >= 200 && id <= 232) {
    return "weatherCard.weather.thunderstorm";
  }

  // Drizzle
  if (id >= 300 && id <= 321) {
    return "weatherCard.weather.drizzle";
  }

  // Rain
  if (id >= 500 && id <= 531) {
    if (id === 500) return "weatherCard.weather.lightRain";
    if (id === 501) return "weatherCard.weather.moderateRain";
    if (id >= 502 && id <= 504) return "weatherCard.weather.heavyRain";
    if (id === 511) return "weatherCard.weather.freezingRain";
    return "weatherCard.weather.showerRain";
  }

  // Snow
  if (id >= 600 && id <= 622) {
    if (id === 600) return "weatherCard.weather.lightSnow";
    if (id === 601) return "weatherCard.weather.snow";
    if (id === 602) return "weatherCard.weather.heavySnow";
    if (id >= 611 && id <= 613) return "weatherCard.weather.sleet";
    if (id >= 615 && id <= 616) return "weatherCard.weather.rainSnow";
    return "weatherCard.weather.snow";
  }

  // Atmosphere
  if (id >= 700 && id <= 781) {
    if (id === 741) return "weatherCard.weather.fog";
    if (id === 701) return "weatherCard.weather.mist";
    if (id === 721) return "weatherCard.weather.haze";
    if (id === 781) return "weatherCard.weather.tornado";
    return "weatherCard.weather.atmosphere";
  }

  // Clear
  if (id === 800) {
    return "weatherCard.weather.clear";
  }

  // Clouds
  if (id >= 801 && id <= 804) {
    if (id === 801) return "weatherCard.weather.fewClouds";
    if (id === 802) return "weatherCard.weather.scatteredClouds";
    if (id === 803) return "weatherCard.weather.brokenClouds";
    if (id === 804) return "weatherCard.weather.overcast";
  }

  return "weatherCard.weather.unknown";
}
