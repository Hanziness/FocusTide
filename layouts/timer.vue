<template>
  <transition name="loading" mode="in-out" appear :duration="1000">
    <splash-screen v-if="loading" />
    <div v-else class="relative w-screen h-screen" :class="[{ 'dark': darkMode }]">
      <slot />
    </div>
  </transition>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import SplashScreen from '~/components/timer/splashScreen.vue'
import { useSettings } from '~/stores/settings'
import { useLoading } from '~/stores/loading'

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
    ...mapState(useSettings, {
      darkMode: store => store.visuals.darkMode
    }),

    ...mapState(useLoading, {
      updateFinished: 'persist_finished'
    })
  },

  mounted () {
    // hide the spinner
    console.log('Mounted layout')
    this.$nextTick(() => {
      this.loading = false
    })
  }
}
</script>

<style scoped>
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
