<template>
  <div v-show="enableComponent" class="fixed top-0 left-0 z-40 w-screen h-screen transition">
    <transition leave-to-class="opacity-0" enter-from-class="opacity-0" appear @after-leave="enableComponent = false">
      <div v-show="currentTutorial !== null" class="fixed top-0 left-0 w-full h-full transition-all duration-500 bg-opacity-40 dark:bg-opacity-70 bg-slate-900" />
    </transition>

    <!-- Tutorial component -->
    <transition-group
      enter-from-class="!translate-y-full"
      enter-active-class="transition duration-500 ease-out"
      leave-to-class="!translate-y-full"
      leave-active-class="transition duration-300"
      appear
    >
      <component :is="tutorial[tutorialId]" v-for="tutorialId in [currentTutorial]" :key="tutorialId" :open="isTutorialOpen(tutorialId)" @close="closeTutorial(tutorialId)" />
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import { markRaw } from 'vue'
import tutorialOnboarding from './tutorialOnboarding.vue'
import { useTutorials } from '~~/stores/tutorials'
import { useMain, flags } from '~~/stores/main'

export default {
  data () {
    return {
      tutorial: {
        onboarding: markRaw(tutorialOnboarding)
      },

      /** Controls whether the darkening backdrop is shown */
      enableComponent: false
    }
  },

  computed: {
    ...mapState(useTutorials, ['currentTutorial', 'isTutorialOpen']),
    ...mapState(useMain, ['isFlagActive'])
  },

  watch: {
    currentTutorial (newValue) {
      // if a tutorial is to be shown, enable the backdrop
      if (newValue !== null) {
        this.enableComponent = true
      }
    }
  },

  mounted () {
    this.enableComponent = this.currentTutorial != null

    if (!this.isFlagActive(flags.STORE_RESTORED)) {
      this.openTutorial('onboarding')
    }
  },

  methods: {
    ...mapActions(useTutorials, ['openTutorial', 'closeTutorial'])
  }
}
</script>
