<script setup lang="ts">
import { markRaw } from 'vue'
import tutorialOnboarding from './tutorialOnboarding.vue'
import tutorialOldDomain from './tutorialOldDomain.vue'
import { useTutorials } from '~~/stores/tutorials'
import { useMain } from '~~/stores/main'

const tutorialsStore = useTutorials()
const mainStore = useMain()

const tutorials = {
  onboarding: markRaw(tutorialOnboarding),
  oldDomain: markRaw(tutorialOldDomain)
}

const state = reactive({
  /** Controls whether the darkening backdrop is shown */
  enableComponent: false
})

watch(() => tutorialsStore.currentTutorial, (newValue) => {
  // if a tutorial is to be shown, enable the backdrop
  if (newValue !== null) {
    state.enableComponent = true
  }
})

onMounted(() => {
  const route = useRoute()
  state.enableComponent = tutorialsStore.currentTutorial != null

  if (!mainStore.restoredStores.includes('tutorials')) {
    tutorialsStore.openTutorial('onboarding')
  }

  if (route.query.olddomain !== undefined) {
    tutorialsStore.openTutorial('oldDomain')
  }
})
</script>

<template>
  <div v-show="state.enableComponent" class="fixed top-0 left-0 z-40 w-screen h-screen transition">
    <transition leave-to-class="opacity-0" enter-from-class="opacity-0" appear @after-leave="state.enableComponent = false">
      <div v-show="tutorialsStore.currentTutorial !== null" class="fixed top-0 left-0 w-full h-full transition-all duration-500 bg-opacity-40 dark:bg-opacity-70 bg-slate-900" />
    </transition>

    <!-- Tutorial component -->
    <transition-group
      enter-from-class="!translate-y-full"
      enter-active-class="transition duration-500 ease-out"
      leave-to-class="!translate-y-full"
      leave-active-class="transition duration-300"
      appear
    >
      <component :is="tutorials[tutorialId]" v-for="tutorialId in (Object.keys(tutorials) as Array<keyof typeof tutorials>)" :key="tutorialId" :open="tutorialsStore.isTutorialOpen(tutorialId)" @close="tutorialsStore.closeTutorial(tutorialId)" />
    </transition-group>
  </div>
</template>
