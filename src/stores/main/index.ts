import { defineStore } from 'pinia'
interface MainStateModel {
  count: number
}
export const useMainStore = defineStore('main', {
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