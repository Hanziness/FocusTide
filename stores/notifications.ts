import { defineStore } from 'pinia'

export enum NotificationPermission {
  Default,
  Granted,
  Denied,
  NotSupported
}

export const useNotifications = defineStore('notifications', {
  state: () => ({
    enabled: NotificationPermission.Default
  }),

  actions: {
    updateEnabled (manualValue? : NotificationPermission) {
      if (manualValue !== undefined) {
        this.enabled = manualValue
        return
      }

      if (typeof window !== 'undefined' && window.Notification) {
        const permissions = window.Notification.permission
        switch (permissions) {
          case 'default':
            this.enabled = NotificationPermission.Default
            break
          case 'granted':
            this.enabled = NotificationPermission.Granted
            break
          default:
            this.enabled = NotificationPermission.Denied
        }
      } else {
        this.enabled = NotificationPermission.NotSupported
      }
    }
  }
})
