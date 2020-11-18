<template>
  <section class="timer-section" :style="{'background-color': $store.getters['schedule/currentScheduleColour']}">
    <!-- Settings button -->
    <ui-button subtle class="absolute" style="top: 0.5rem; right: 0.5rem; z-index: 10;" @click="showSettings = true">
      <client-only>
        <cog-icon class="text-lg" />
      </client-only>
    </ui-button>
    <!-- Settings panel -->
    <lazy-hydrate when-visible>
      <div>
        <transition name="transition-fade">
          <ui-overlay v-if="showSettings" />
        </transition>
        <transition name="transition-slidein">
          <settings-panel v-if="showSettings" v-model="showSettings" class="right-0" />
        </transition>
      </div>
    </lazy-hydrate>
    <notification-controller>
      <ticker slot-scope="{handleCompletion}" @complete="handleCompletion">
        <div
          slot-scope="{ timerState, timeElapsed, timeOriginal }"
          :class="['p-8 flex flex-col justify-center items-center bg-transparent h-full']"
          width="100%"
          height="100%"
        >
          <!-- <div slot-scope="{ timerRemaining, timerOriginal }"> -->
          <schedule-display />
          <timer-progress
            v-if="$store.getters['settings/performanceSettings'].showProgressBar"
            :time-elapsed="timeElapsed"
            :time-original="timeOriginal"
          />
          <div class="flex-grow" />
          <timer-switch
            :time-elapsed="timeElapsed"
            :time-original="timeOriginal"
            :timer-state="timerState"
            :timer-widget="$store.state.settings.currentTimer"
          />
          <div class="flex-grow" />
          <timer-controls />
        <!-- </div> -->
        </div>
      </ticker>
    </notification-controller>
  </section>
</template>

<style lang="scss" scoped>
html {
  @apply overflow-hidden;
}

section.timer-section {
  height: 100vh;
  transition: background-color 300ms ease-in;
}

.timer-background {
  transition: 300ms ease-in;
  transition-property: background-color;
  position: relative;
  height: 100%;
}
</style>

<script>
import LazyHydrate from 'vue-lazy-hydration'

export default {
  layout: 'timer',
  components: {
    Ticker: () => import('@/components/ticker.vue'),
    ScheduleDisplay: () => import('@/components/tailwinded/schedule/scheduleDisplay.vue'),
    NotificationController: () => import('@/components/notifications/notificationController.vue'),
    TimerProgress: () => import('@/components/tailwinded/timer/timerProgress.vue'),
    TimerSwitch: () => import('@/components/tailwinded/timer/display/_timerSwitch.vue'),
    TimerControls: () => import('@/components/tailwinded/timer/timerControls.vue'),
    SettingsPanel: () => import(/* webpackPrefetch: true */ '@/components/tailwinded/settings/settingsPanel.vue'),
    UiButton: () => import('@/components/tailwinded/base/button.vue'),
    UiOverlay: () => import('@/components/tailwinded/base/overlay.vue'),
    CogIcon: () => import('vue-material-design-icons/Cog.vue'),
    LazyHydrate
  },

  data () {
    return {
      showSettings: false
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
      const currentScheduleItem = this.$store.getters['schedule/getCurrentItem']
      return this.$dayjs.getFormattedTime(
        currentScheduleItem.length - currentScheduleItem.timeElapsed,
        this.$store.state.settings.currentTimer,
        { total: currentScheduleItem.length, lang: this.$store.state.settings.lang }
      )
    },

    pageTitle () {
      return this.$store.getters['schedule/getCurrentItem']
        ? this.$i18n.t('section.' + this.$store.getters['schedule/getCurrentItem'].type).toLowerCase() : 'Pomodoro'
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
  },

  head () {
    return {
      titleTemplate: `(${this.remainingTimeString}) %s`,
      title: `${this.pageTitle}`,
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
  }
}
</script>
