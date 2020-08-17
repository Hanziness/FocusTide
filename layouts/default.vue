<template>
  <v-app>
    <settings-window v-model="settingsOpen" />
    <v-app-bar
      absolute
      app
      flat
      collapse
      class="timer-app-bar"
    >
      <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
      <v-toolbar-title v-text="title">
        <v-spacer />
      </v-toolbar-title>
      <v-btn class="ma-0" icon @click="settingsOpen = !settingsOpen">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="py-0">
      <nuxt />
    </v-main>
    <portal to="footer">
      <v-footer
        class="timer-footer"
      >
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </v-footer>
    </portal>
  </v-app>
</template>

<style lang="scss" scoped>
.timer-app-bar {
  position: fixed;
  width: max-content;
}

footer.timer-footer {
  background-color: transparent;
}
</style>

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
      title: 'A simple Pomodoro app'
    }
  }
}
</script>
