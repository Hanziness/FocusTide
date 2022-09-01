import { defineStore } from 'pinia'

export const useMobileSettings = defineStore('platforms:mobile', {
  state: () => ({
    padding: {
      top: 0,
      bottom: 0
    }
  })
})
