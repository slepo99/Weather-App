import { defineStore } from 'pinia'
interface MainStateModel {
  count: number
}
export const useWeatherStore = defineStore('weather', {
  state: (): MainStateModel => {
    return { count: 0 }
  },
  getters: {},
  actions: {
    increment() {
      this.count++
    },
  },
})