<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { useHead } from '#app'
import { useI18n } from 'vue-i18n'
import { useSchedule } from '~~/stores/schedule'
import { useSettings } from '~~/stores/settings'

import { useTicker } from '~~/components/ticker'
import { useWeb } from '~~/platforms/web'
import { useMobile } from '~~/platforms/mobile'

import TimerSwitch from '@/components/timer/display/_timerSwitch.vue'
import TimerProgress from '@/components/timer/timerProgress.vue'
import TimerControls from '@/components/timer/controls/controlsNew.vue'
import { AppPlatform } from '~~/platforms/platforms'

import { useMobileSettings } from '~~/stores/platforms/mobileSettings'

// components
const AppBar = defineAsyncComponent(() => import('@/components/appBar.vue'))
const TutorialView = defineAsyncComponent(() => import('@/components/tutorial/_tutorialView.vue'))

const settingsStore = useSettings()
const mobileSettingsStore = useMobileSettings()
const scheduleStore = useSchedule()

const runtimeConfig = useRuntimeConfig()

const { t } = useI18n()

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

definePageMeta({ layout: 'timer', layoutTransition: false })
useHead({
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

const state = reactive({
  timeString: ''
})

const remainingTimeString = computed(() => {
  if (scheduleStore.getCurrentTimerState === 3) {
    return settingsStore.pageTitle.useTickEmoji ? '✔' : t('ready').toLowerCase()
  }

  return state.timeString
})

const pageTitle = computed(() => {
  return scheduleStore.getCurrentItem
    ? t('section.' + scheduleStore.getCurrentItem.type).toLowerCase()
    : 'Pomodoro'
})

const progressBarSchedules = computed(() => {
  const numSchedules = settingsStore.performance.showProgressBar ? 2 : 1
  return scheduleStore.getSchedule.slice(0, numSchedules)
})
</script>

<template>
  <section class="h-full overflow-hidden duration-300 ease-in dark:text-gray-50">
    <Title>{{ (remainingTimeString ? `(${remainingTimeString}) ` : '') + pageTitle }}</Title>

    <!-- Dark mode background override -->
    <div class="absolute w-full h-full dark:bg-gray-900" />

    <!-- Progress bar -->
    <TransitionGroup name="progress-transition" :duration="1000">
      <TimerProgress v-for="(scheduleItem, index) in progressBarSchedules" :key="scheduleItem.id" :colour="scheduleStore.getScheduleColour[index]"
        :schedule-entry-id="scheduleItem.id" :background="index === 0" :time-elapsed="scheduleStore.getCurrentItem.timeElapsed"
        :time-original="scheduleStore.getCurrentItem.length" />
    </TransitionGroup>
    <div class="relative flex flex-col items-center justify-center w-full h-full isolate" :style="{
      'padding-top': `${mobileSettingsStore.padding.top}px`,
      'padding-bottom': `${mobileSettingsStore.padding.bottom}px`
    }">
      <AppBar />
      <TimerSwitch key="timerswitch" :time-elapsed="scheduleStore.getCurrentItem.timeElapsed"
        :time-original="scheduleStore.getCurrentItem.length" :timer-state="scheduleStore.timerState"
        :timer-widget="settingsStore.currentTimer" class="flex-grow" @tick="state.timeString = $event" />

      <TimerControls class="mb-8" />
    </div>
    <client-only>
      <TutorialView />
    </client-only>
  </section>
</template>

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
