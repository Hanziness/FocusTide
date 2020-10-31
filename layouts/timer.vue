<template>
  <v-app>
    <v-main class="py-0">
      <nuxt />
    </v-main>
    <portal to="footer">
      <span>&copy; {{ new Date().getFullYear() }}</span>
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
export default {
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
