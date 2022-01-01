<template>
  <section :class="['timer-section', {'dark' : $store.state.settings.visuals.darkMode }]">
    <!-- Dark mode background override -->
    <div class="absolute w-full h-full dark:bg-gray-900" />

    <!-- Settings button -->
    <ui-button subtle :class="['absolute', { 'pointer-events-none': preview }]" style="top: 0.5rem; right: 0.5rem; z-index: 10;" @click="showSettings = true">
      <client-only>
        <cog-icon class="dark:text-gray-200" :title="$i18n.t('settings.heading')" />
      </client-only>
    </ui-button>
    <!-- Settings panel -->
    <div>
      <transition name="transition-fade">
        <ui-overlay v-if="showSettings" />
      </transition>
      <transition name="transition-slidein">
        <settings-panel v-if="showSettings" v-model="showSettings" class="right-0" />
      </transition>
    </div>
    <notification-controller>
      <ticker slot-scope="{handleCompletion}" @complete="handleCompletion">
        <div
          slot-scope="{ timerState, timeElapsed, timeOriginal }"
          class="relative w-full h-full flex justify-center"
        >
          <transition name="schedule-transition">
            <schedule-display
              v-if="$store.state.settings.schedule.visibility.enabled"
              class="absolute ml-auto mr-auto"
              style="top: 2rem;"
            />
          </transition>

          <transition-group name="progress-transition" tag="div" :duration="1000">
            <timer-progress
              v-for="(scheduleItem, index) in progressBarSchedules"
              :key="scheduleItem.id"
              :colour="$store.getters['schedule/getScheduleColour'][index]"
              :background="index === 0"
              :time-elapsed="timeElapsed"
              :time-original="timeOriginal"
            />
          </transition-group>

          <timer-switch
            :time-elapsed="timeElapsed"
            :time-original="timeOriginal"
            :timer-state="timerState"
            :timer-widget="$store.state.settings.currentTimer"
            class="grid absolute place-items-center"
          />
          <timer-controls :class="['absolute', { 'pointer-events-none': preview }]" style="bottom: 2rem;" :can-use-keyboard="!preview && !showSettings" />
          <todo-list v-show="$store.state.settings.tasks.enabled" class="absolute z-10" style="right: 24px; bottom: 24px;" :editing="[0].includes($store.state.schedule.timerState)" />
        </div>
      </ticker>
    </notification-controller>
  </section>
</template>

<script>
import { SettingsIcon } from 'vue-tabler-icons'

export default {
  name: 'PageTimer',
  components: {
    Ticker: () => import(/* webpackChunkName: "ticker", webpackMode: "eager" */ '@/components/ticker.vue'),
    ScheduleDisplay: () => import(/* webpackChunkName: "schedule", webpackPrefetch: true */ '@/components/schedule/scheduleDisplay.vue'),
    NotificationController: () => import(/* webpackChunkName: "notificationController", webpackMode: "eager" */ '@/components/notifications/notificationController.vue'),
    TimerProgress: () => import(/* webpackChunkName: "progress", webpackPrefetch: true */ '@/components/timer/timerProgress.vue'),
    TimerSwitch: () => import(/* webpackChunkName: "timerSwitch", webpackPrefetch: true */ '@/components/timer/display/_timerSwitch.vue'),
    // TimerControls: () => import(/* webpackChunkName: "timerControls", webpackPrefetch: true */ '@/components/timer/timerControls.vue'),
    TimerControls: () => import(/* webpackChunkName: "timerControls", webpackPrefetch: true */ '@/components/timer/controls/basic.vue'),
    SettingsPanel: () => import(/* webpackChunkName: "settings", webpackMode: "eager" */ '@/components/settings/settingsPanel.vue'),
    UiButton: () => import(/* webpackChunkName: "uibase", webpackPrefetch: true */ '@/components/base/button.vue'),
    UiOverlay: () => import(/* webpackChunkName: "uibase", webpackPrefetch: true */ '@/components/base/overlay.vue'),
    CogIcon: SettingsIcon,
    TodoList: () => import('@/components/todoList/main.vue')
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
      showSettings: false
    }
  },

  head () {
    if (this.preview) { return }
    return {
      title: `(${this.remainingTimeString}) ${this.pageTitle}`,
      meta: [{
        hid: 'description',
        content: 'Jumpstart your Pomodoro sessions with the timer of AnotherPomodoro.'
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

      const currentScheduleItem = this.$store.getters['schedule/getCurrentItem']
      return this.$dayjs.getFormattedTime(
        currentScheduleItem.length - currentScheduleItem.timeElapsed,
        this.$store.state.settings.currentTimer,
        { total: currentScheduleItem.length, lang: this.$store.state.settings.lang }
      )
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

  beforeCreate () {
    // this.$store.commit('settings/applyPreset', 'debug')
    // this.$store.dispatch('events/checkSchedule')
    // this.$store.dispatch('timer/setNewTimer', this.$store.getters['events/getSchedule'][0]._length)
  },

  mounted () {
    // this.$store.dispatch('timer/initDefaultSubscribeFunctions')

    const thisRef = this
    document.addEventListener('visibilitychange', function () {
      thisRef.$store.commit('settings/registerNewHidden', document.hidden)
      if (!document.hidden) {
        // tick if needed
        // thisRef.$store.dispatch('timer/scheduleNextTick', {}) // tick the timer if document is now visible
      }
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
