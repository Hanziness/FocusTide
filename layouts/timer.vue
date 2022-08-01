<template>
  <div class="relative w-screen h-screen" :class="[{ 'dark': darkMode }]">
    <slot />
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { useSettings } from '~~/stores/settings'
import { useLoading } from '~~/stores/loading'

export default {
  name: 'LayoutTimer',

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState(useSettings, {
      darkMode: store => store.visuals.darkMode
    }),

    ...mapState(useLoading, {
      updateFinished: 'persist_finished'
    })
  }
}
</script>

<style scoped>
.loading-enter-active,
.loading-leave-active {
  @apply transition-all duration-1000 ease-out;
}

.loading-enter-from,
.loading-appear-from {
  @apply opacity-60;

  clip-path: circle(0%);
}

.loading-enter-to,
.loading-appear-to {
  clip-path: circle(100%);
}
</style>
