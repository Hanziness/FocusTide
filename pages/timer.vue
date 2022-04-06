<template>
  <section :class="['timer-section', {'dark' : $store.state.settings.visuals.darkMode }]">
    <!-- Dark mode background override -->
    <div class="dark:bg-gray-900 absolute w-full h-full" />

    <!-- Settings panel -->
    <div>
      <Transition name="transition-fade">
        <UiOverlay v-if="showSettings" />
      </Transition>
      <Transition name="transition-slidein">
        <SettingsPanel v-if="showSettings" v-model="showSettings" class="right-0" />
      </Transition>
    </div>
    <NotificationController>
      <Ticker slot-scope="{handleCompletion}" @complete="handleCompletion">
        <div
          slot-scope="{ timerState, timeElapsed, timeOriginal }"
          class="relative flex flex-col items-center justify-center w-full h-full"
        >
          <div class="z-10 flex flex-row w-full">
            <div
              class="md:w-auto flex flex-col overflow-hidden transition-all duration-300 bg-gray-800 shadow-lg"
              :class="[$store.state.settings.schedule.visibility.enabled ? 'mt-0 md:mt-3 md:rounded-lg w-full max-w-full mx-auto self-center px-3' : 'ml-auto p-2 rounded-l-lg mt-3']"
            >
              <div class="flex flex-row gap-2">
                <ScheduleDisplay v-show="$store.state.settings.schedule.visibility.enabled" class="px-0" />
                <!-- Settings button -->
                <div class="flex-column flex items-center">
                  <button
                    :aria-label="$i18n.t('settings.heading')"
                    class="hover:bg-slate-200 hover:bg-opacity-30 active:bg-opacity-50 p-3 text-gray-200 transition rounded-full"
                    :class="{ 'pointer-events-none': preview }"
                    @click="showSettings = true"
                  >
                    <CogIcon :aria-label="$i18n.t('settings.heading')" />
                  </button>
                </div>
              </div>
              <div v-if="$store.state.settings.schedule.visibility.enabled && $store.state.settings.schedule.visibility.showSectionType" class="text-gray-50 py-2 text-center bg-gray-700 select-none">
                {{ $i18n.t('section.' + $store.getters['schedule/getCurrentItem'].type).toLowerCase() }}
              </div>
            </div>
          </div>

          <TransitionGroup name="progress-transition" tag="div" :duration="1000">
            <TimerProgress
              v-for="(scheduleItem, index) in progressBarSchedules"
              :key="scheduleItem.id"
              :colour="$store.getters['schedule/getScheduleColour'][index]"
              :background="index === 0"
              :time-elapsed="timeElapsed"
              :time-original="timeOriginal"
            />
          </TransitionGroup>

          <TimerSwitch
            :time-elapsed="timeElapsed"
            :time-original="timeOriginal"
            :timer-state="timerState"
            :timer-widget="$store.state.settings.currentTimer"
            class="place-items-center absolute grid"
            @tick="timeString = $event"
          />
          <TimerControls class="mb-4" :class="[{ 'pointer-events-none': preview }]" :can-use-keyboard="!preview && !showSettings" />
          <TodoList v-show="$store.state.settings.tasks.enabled" class="absolute z-10" style="right: 24px; bottom: 24px;" :editing="[0].includes($store.state.schedule.timerState)" />
        </div>
      </Ticker>
    </NotificationController>
  </section>
</template>

<script>
import { SettingsIcon } from 'vue-tabler-icons'

// Static imports:

export default {
  name: 'PageTimer',
  components: {
    Ticker: () => import(/* webpackChunkName: "ticker", webpackMode: "eager" */ '@/components/ticker.vue'),
    ScheduleDisplay: () => import(/* webpackChunkName: "schedule", webpackPrefetch: true */ '@/components/schedule/scheduleDisplay.vue'),
    NotificationController: () => import(/* webpackChunkName: "ticker", webpackMode: "eager" */ '@/components/notifications/notificationController.vue'),
    TimerProgress: () => import(/* webpackChunkName: "progress", webpackPrefetch: true */ '@/components/timer/timerProgress.vue'),
    TimerSwitch: () => import(/* webpackChunkName: "timerSwitch", webpackPrefetch: true */ '@/components/timer/display/_timerSwitch.vue'),
    TimerControls: () => import(/* webpackChunkName: "timerControls", webpackPrefetch: true */ '~/components/timer/controls/contolsBasic.vue'),
    SettingsPanel: () => import(/* webpackChunkName: "settings" */ '@/components/settings/settingsPanel.vue'),
    UiOverlay: () => import(/* webpackChunkName: "uibase", webpackPrefetch: true */ '@/components/base/overlay.vue'),
    TodoList: () => import(/* webpackChunkName: "todo" */ '@/components/todoList/main.vue'),
    CogIcon: SettingsIcon
  },

  layout: 'timer',

  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showSettings: false,
      timeString: ''
    }
  },

  head () {
    if (this.preview) { return }
    return {
      title: (this.remainingTimeString ? `(${this.remainingTimeString}) ` : '') + this.pageTitle,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Jumpstart your productivity sessions with AnotherPomodoro. Start your timer session on this page, or check the home page for a guided tour!'
      }],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: `data:image/svg+xml,
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  style="color: ${this.$store.getters['schedule/currentScheduleColour']};"
                  xmlns="http://www.w3.org/2000/svg"
                ><circle cx="16" cy="16" r="14" fill="currentColor" /></svg>`
        }
      ]
    }
  },

  computed: {
    currentColour () {
      const currentState = this.$store.state.events.schedule[0] ? this.$store.state.events.schedule[0]._type : null
      if (currentState) {
        return this.$store.state.settings.visuals[currentState].colour
      } else {
        return ''
      }
    },

    remainingTimeString () {
      if (this.$store.getters['schedule/getCurrentTimerState'] === 3) {
        return this.$store.state.settings.pageTitle.useTickEmoji ? '✔' : this.$i18n.t('ready').toLowerCase()
      }

      return this.timeString
    },

    pageTitle () {
      return this.$store.getters['schedule/getCurrentItem']
        ? this.$i18n.t('section.' + this.$store.getters['schedule/getCurrentItem'].type).toLowerCase()
        : 'Pomodoro'
    },

    progressBarSchedules () {
      const numSchedules = this.$store.state.settings.performance.showProgressBar ? 2 : 1
      return this.$store.getters['schedule/getSchedule'].slice(0, numSchedules)
    }
  },

  mounted () {
    // Add visibility change listener for adaptive ticking
    document.addEventListener('visibilitychange', () => {
      this.$store.commit('settings/registerNewHidden', document.hidden)
    })
  }
}
</script>

<style lang="scss" scoped>
html {
  @apply overflow-hidden;
}

section.timer-section {
  @apply dark:text-gray-50 transition-colors duration-300 ease-in;

  height: 100%;
  // transition: background-color 300ms ease-in;
}

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
