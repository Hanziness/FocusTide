import { defineStore } from 'pinia'

export default defineStore('loading', {
  state: () => ({
    persist_finished: false
  }),

  actions: {
    finished () {
      this.persist_finished = true
    }
  }
})
