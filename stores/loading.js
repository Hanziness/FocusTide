import { defineStore } from 'pinia'

export const useLoading = defineStore('loading', {
  state: () => ({
    persist_finished: false
  }),

  actions: {
    finished () {
      this.persist_finished = true
    }
  }
})
