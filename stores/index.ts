import { defineStore } from 'pinia'
import { useRuntimeConfig } from '#app'

export const flags = {
  STORE_RESTORED: 'store_restored'
}

export const useMain = defineStore('main', {
  state: () => ({
    version: useRuntimeConfig().public.PACKAGE_VERSION,
    flags: [],
    skippedStores: {}
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
