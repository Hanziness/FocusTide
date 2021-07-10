<template>
  <div :class="['page', { 'dark': darkMode }]">
    <nuxt />
    <!-- <portal to="footer">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </portal> -->
  </div>
</template>

<script>
export default {
  name: 'LayoutTimer',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    darkMode () {
      return this.$store.state.settings.visuals.darkMode
    },

    updateFinished () {
      return this.$store.state.loading.persist_finished
    }
  },
  watch: {
    updateFinished () {
      this.$forceUpdate()
    }
  },
  mounted () {
    if (this.updateFinished) {
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
.timer-app-bar {
  position: fixed;
  width: max-content;
}

footer.timer-footer {
  background-color: transparent;
}
</style>
