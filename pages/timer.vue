
<template>
  <section
    class="h-full overflow-hidden duration-300 ease-in dark:text-gray-50"
  >
    <Title>{{ (remainingTimeString ? `(${remainingTimeString}) ` : '') + pageTitle }}</Title>

    <!-- Dark mode background override -->
    <div class="absolute w-full h-full dark:bg-gray-900" />

    <!-- Settings panel -->
    <Transition name="transition-fade">
      <UiOverlay v-if="showSettings" />
    </Transition>
    <Transition name="transition-slidein">
      <SettingsPanel v-if="showSettings" v-model="showSettings" class="right-0" />
    </Transition>
    <TransitionGroup name="progress-transition" tag="div" :duration="1000">
      <TimerProgress
        v-for="(scheduleItem, index) in progressBarSchedules"
        :key="scheduleItem.id"
        :colour="scheduleStore.getScheduleColour[index]"
        :background="index === 0"
        :time-elapsed="scheduleStore.getCurrentItem.timeElapsed"
        :time-original="scheduleStore.getCurrentItem.length"
      />
    </TransitionGroup>
    <div
      class="relative flex flex-col items-center justify-center w-full h-full isolate"
      :style="{
        'padding-top': `${mobileSettingsStore.padding.top}px`,
        'padding-bottom': `${mobileSettingsStore.padding.bottom}px`
      }"
    >
      <AppBar />
      <TimerSwitch
        key="timerswitch"
        :time-elapsed="scheduleStore.getCurrentItem.timeElapsed"
        :time-original="scheduleStore.getCurrentItem.length"
        :timer-state="scheduleStore.timerState"
        :timer-widget="settingsStore.currentTimer"
        class="flex-grow"
        @tick="timeString = $event"
      />
      <div class="relative flex flex-row items-center justify-center w-full gap-2 mb-4">
        <TimerControls :class="[{ 'pointer-events-none': preview }]" :can-use-keyboard="!preview && !showSettings" />
      </div>
    </div>
    <client-only>
      <TutorialView />
    </client-only>
  </section>
</template>

<script>
import { mapStores } from 'pinia'
import { SettingsIcon, ListCheckIcon } from 'vue-tabler-icons'
import { defineAsyncComponent } from 'vue'
import { useHead } from '#app'
import { useSchedule } from '~~/stores/schedule'
import { useSettings } from '~~/stores/settings'
import { useEvents } from '~~/stores/events'

// Static imports:
import { useTicker } from '~~/components/ticker.ts'
import { useWeb } from '~~/platforms/web'
import { useMobile } from '~~/platforms/mobile'

import TimerSwitch from '@/components/timer/display/_timerSwitch.vue'
import Button from '@/components/base/button.vue'
import TimerProgress from '@/components/timer/timerProgress.vue'
import TimerControls from '@/components/timer/controls/contolsBasic.vue'
import { AppPlatform } from '~~/platforms/platforms'

import { useMobileSettings } from '~~/stores/platforms/mobileSettings'

export default {
  name: 'PageTimer',
  components: {
    // lazy-loaded components
    AppBar: defineAsyncComponent(() => import('@/components/appBar.vue')),
    SettingsPanel: defineAsyncComponent(() => import('@/components/settings/settingsPanel.vue')),
    TodoList: defineAsyncComponent(() => import('@/components/todoList/main.vue')),
    TutorialView: defineAsyncComponent(() => import('@/components/tutorial/_tutorialView.vue')),
    UiOverlay: defineAsyncComponent(() => import('@/components/base/overlay.vue')),
    TimerControls,
    TimerProgress,
    TimerSwitch,
    CogIcon: SettingsIcon,
    ListCheckIcon,
    Button
  },

  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },

  setup () {
    definePageMeta({ layout: 'timer', layoutTransition: false })
    const mobileSettingsStore = useMobileSettings()

    const scheduleStore = useSchedule()
    const runtimeConfig = useRuntimeConfig()

    const iconSvg = computed(() => `data:image/svg+xml,
      <svg
        width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      style="color: ${scheduleStore.currentScheduleColour};"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="14" fill="currentColor" /></svg>`)

    useHead({
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Jumpstart your productivity sessions with FocusTide. Start your timer session on this page, or check the home page for a guided tour!'
      }],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: iconSvg
        }
      ]
    })

    useTicker()

    // Load appropriate platform module based on runtime config
    if (runtimeConfig.public.PLATFORM === AppPlatform.web) {
      useWeb()
    } else if (runtimeConfig.public.PLATFORM === AppPlatform.mobile) {
      useMobile()
    }

    return {
      mobileSettingsStore
    }
  },

  data () {
    return {
      showSettings: false,
      showTodoManager: false,
      timeString: ''
    }
  },

  computed: {
    currentColour () {
      const currentState = this.scheduleStore.items[0]?.type
      if (currentState) {
        return this.settingsStore.getColor(currentState)
      } else {
        return ''
      }
    },

    remainingTimeString () {
      if (this.scheduleStore.getCurrentTimerState === 3) {
        return this.settingsStore.pageTitle.useTickEmoji ? '✔' : this.$t('ready').toLowerCase()
      }

      return this.timeString
    },

    pageTitle () {
      return this.scheduleStore.getCurrentItem
        ? this.$t('section.' + this.scheduleStore.getCurrentItem.type).toLowerCase()
        : 'Pomodoro'
    },

    progressBarSchedules () {
      const numSchedules = this.settingsStore.performance.showProgressBar ? 2 : 1
      return this.scheduleStore.getSchedule.slice(0, numSchedules)
    },

    ...mapStores(useSettings, useSchedule, useEvents)
  }
}
</script>

<style lang="scss" scoped>
.timer-background {
  transition: 300ms ease-in;
  transition-property: background-color;
  position: relative;
  height: 100%;
}

.schedule-transition-enter-active,
.schedule-transition-leave-active {
  transition: transform 300ms ease-out, opacity 200ms ease-out;
}

.schedule-transition-enter,
.schedule-transition-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.progress-transition-leave-to {
  @apply transform-gpu translate-x-0;
}

.progress-transition-enter {
  @apply transform-gpu -translate-x-full;
}
</style>

<style>
body {
  overscroll-behavior-y: contain;
}
</style>
