<template>
  <Transition name="loading" mode="in-out" appear duration="1000">
    <SplashScreen v-if="loading" />
    <div v-else :class="['w-screen, h-screen relative', { 'dark': darkMode }]">
      <nuxt />
    </div>
  </Transition>
</template>

<script>
import SplashScreen from '~/components/timer/splashScreen.vue'

export default {
  name: 'LayoutTimer',

  components: {
    SplashScreen
  },

  data () {
    return {
      loading: true
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

  mounted () {
    // hide the spinner
    this.$nextTick(() => {
      this.loading = false
    })
  }
}
</script>

<style lang="scss" scoped>
.loading-enter-active,
.loading-leave-active {
  @apply transition-all duration-1000 ease-out;
}

.loading-enter {
  @apply opacity-60;

  clip-path: circle(0%);
}

.loading-enter-to {
  clip-path: circle(100%);
}
</style>
