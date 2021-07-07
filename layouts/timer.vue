<template>
  <div :class="['page', { 'dark': $store.state.settings.visuals.darkMode }]">
    <nuxt />
    <!-- <portal to="footer">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </portal> -->
  </div>
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
