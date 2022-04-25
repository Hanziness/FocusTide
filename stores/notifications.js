import { defineStore } from 'pinia'

export const useNotifications = defineStore('notifications', {
  state: () => ({
    enabled: undefined
  }),

  actions: {
    updateEnabled (manualValue = undefined) {
      if (manualValue !== undefined) {
        this.enabled = manualValue
        return
      }

      if (window && window.Notification) {
        const permissions = window.Notification.permission
        if (permissions === 'default') {
          this.enabled = null
        } else if (permissions === 'granted') {
          this.enabled = true
        } else {
          this.enabled = false
        }
      } else {
        this.enabled = false
      }
    }
  }
})
