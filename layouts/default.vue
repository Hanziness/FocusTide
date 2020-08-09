<template>
  <v-app>
    <settings-window v-model="settingsOpen" />
    <v-app-bar
      fixed
      app
      flat
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="settingsOpen = !settingsOpen">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import SettingsWindow from '@/components/settingsWindow.vue'

export default {
  components: {
    SettingsWindow
  },
  data () {
    return {
      drawer: false,
      settingsOpen: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      title: 'A simple Promodoro app'
    }
  }
}
</script>
