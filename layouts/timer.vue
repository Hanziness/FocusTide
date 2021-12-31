<template>
  <transition name="loading" mode="in-out">
    <LoadingIndicator v-if="loading" />
    <div v-if="!loading" :class="['w-screen, h-screen relative', { 'dark': darkMode }]">
      <nuxt />
    </div>
  </transition>
</template>

<script>
import LoadingIndicator from '@/components/timer/loading.vue'

export default {
  name: 'LayoutTimer',
  components: {
    LoadingIndicator
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
  watch: {
    updateFinished () {
      this.$forceUpdate()
    }
  },

  mounted () {
    if (this.updateFinished) {
      this.$forceUpdate()
    }

    // hide the spinner
    this.loading = false
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

.loading-enter-active {
  @apply transition-all duration-1000;
}

.loading-enter {
  @apply opacity-60;

  clip-path: circle(0%);
}

.loading-enter-to {
  clip-path: circle(100%);
}
</style>
