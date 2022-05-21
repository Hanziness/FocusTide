import { defineStore } from 'pinia'

export const flags = {
  STORE_RESTORED: 'store_restored'
}

export const useMain = defineStore('main', {
  state: () => ({
    version: process.env.PACKAGE_VERSION,
    flags: []
  }),

  getters: {
    isFlagActive: state => flag => state.flags.includes(flag)
  },

  actions: {
    registerFlag (flag) {
      if (!this.flags.includes(flag)) {
        this.flags.push(flag)
      }
    }
  }
})
