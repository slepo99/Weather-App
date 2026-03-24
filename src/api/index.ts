import axios from 'axios'
import type { AxiosInstance } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_OPENWEATHER_BASE_URL || 'https://api.openweathermap.org',
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  config.params ??= {}
  config.params.appid = import.meta.env.VITE_OPENWEATHER_API_KEY

  return config
})

export default api