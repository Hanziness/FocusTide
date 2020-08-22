<template>
  <div>
    <settings-item :state-keys="['permissions', 'audio']" type="boolean" :icon="$store.state.settings.permissions.audio ? 'mdi-volume-high' : 'mdi-volume-off'" show-description />
    <settings-item
      :state-keys="['permissions', 'notifications']"
      type="boolean"
      :set-value-on-change="false"
      :icon="notificationPermissionIcon"
      show-description
      @change="notificationPermission = $event"
    />
  </div>
</template>

<script>
import SettingsItem from '@/components/settings/settingsItem.vue'

export default {
  components: { SettingsItem },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    notificationPermissionIcon: {
      get () {
        if (this.$store.state.settings.permissions.notifications && Notification.permission === 'granted') {
          // We can show notifications: show icon based on the setting
          return 'mdi-bell-ring-outline'
        } else if (!this.$store.state.settings.permissions.notifications && Notification.permission === 'granted') {
          // Notifications are allowed, but the user disabled them in the app
          return 'mdi-bell-minus-outline'
        } else if (Notification.permission === 'denied') {
          // User had denied the notification request
          return 'mdi-bell-remove-outline'
        }

        // User had not granted us permission to display notifications
        return 'mdi-bell-off-outline'
      }
    },

    audioPermission: {
      get () {
        return this.$store.state.settings.permissions.audio
      }
    },

    notificationPermission: {
      get () {
        return Notification.permission === 'granted' && this.$store.state.settings.permissions.notifications
      },
      set (newValue) {
        if (Notification.permission === 'default') {
          const thisRef = this
          this.$notification.requestPermission().then((newValue) => {
            if (newValue === 'granted') {
              thisRef.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: true })
            } else {
              thisRef.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: false })
            }
          })
        } else if (Notification.permission === 'granted') {
          this.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: newValue })
        }
      }
    }
  },

  mounted () {
  }
}
</script>
