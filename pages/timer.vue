
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
      <div class="flex flex-row w-full">
        <div
          class="flex flex-col overflow-hidden transition-all duration-300 bg-gray-800 shadow-lg md:w-auto"
          :class="[settingsStore.schedule.visibility.enabled ? 'mt-0 md:mt-3 md:rounded-lg w-full max-w-full mx-auto self-center' : 'ml-auto p-2 rounded-l-lg mt-3']"
        >
          <div class="flex flex-row gap-3" :class="[settingsStore.schedule.visibility.enabled ? 'px-3' : '']">
            <ScheduleDisplay v-show="settingsStore.schedule.visibility.enabled" class="px-0" />
            <!-- Settings button -->
            <div class="flex items-center flex-column">
              <Button
                circle
                default-style
                :importance="3"
                :aria-label="$t('settings.heading')"
                class="text-gray-200"
                @click="showSettings = true"
              >
                <CogIcon :aria-label="$t('settings.heading')" />
              </Button>
            </div>
          </div>
          <div v-if="settingsStore.schedule.visibility.enabled && settingsStore.schedule.visibility.showSectionType" class="py-2 text-center bg-gray-700 select-none text-gray-50">
            {{ $t('section.' + scheduleStore.getCurrentItem.type).toLowerCase() }}
          </div>
        </div>
      </div>
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
        <Button
          v-if="settingsStore.tasks.enabled"
          circle
          :importance="1"
          class="transition right-5 sm:absolute"
          bg-class="dark:bg-slate-800 bg-slate-200"
          inner-class="p-5 dark:text-slate-50"
          :class="{'scale-0': showTodoManager}"
          @click="showTodoManager = true"
        >
          <ListCheckIcon />
        </Button>
      </div>
      <transition enter-from-class="translate-y-full" enter-active-class="duration-300 ease-out" leave-to-class="translate-y-full" leave-active-class="duration-150 ease-in">
        <todo-list v-if="settingsStore.tasks.enabled && showTodoManager" class="fixed bottom-0 z-10 w-full max-w-lg transition-all rounded-t-xl xl:right-4 xl:pb-8" :editing="[0].includes(scheduleStore.timerState)" @hide="showTodoManager = false" />
      </transition>
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
    ScheduleDisplay: defineAsyncComponent(() => import('@/components/schedule/scheduleDisplay.vue')),
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
        content: 'Jumpstart your productivity sessions with AnotherPomodoro. Start your timer session on this page, or check the home page for a guided tour!'
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
