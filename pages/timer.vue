<template>
  <section class="timer-section" :style="{'background-color': $store.getters['schedule/currentScheduleColour']}">
    <!-- Settings button -->
    <ui-button subtle class="absolute" style="top: 0.5rem; right: 0.5rem; z-index: 10;" @click="showSettings = true">
      <client-only>
        <cog-icon class="text-lg" :title="$i18n.t('settings.heading')" />
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
          class="relative w-full h-full flex justify-center"
        >
          <lazy-hydrate when-visible>
            <transition slot-scope="{ hydrated }" name="schedule-transition">
              <schedule-display
                v-if="hydrated && $store.state.settings.schedule.visibility.enabled"
                class="absolute ml-auto mr-auto"
                style="top: 2rem;"
              />
            </transition>
          </lazy-hydrate>

          <lazy-hydrate when-visible>
            <transition slot-scope="{ hydrated }" name="transition-fade">
              <timer-progress
                v-if="hydrated && $store.getters['settings/performanceSettings'].showProgressBar"
                :time-elapsed="timeElapsed"
                :time-original="timeOriginal"
              />
            </transition>
          </lazy-hydrate>

          <timer-switch
            :time-elapsed="timeElapsed"
            :time-original="timeOriginal"
            :timer-state="timerState"
            :timer-widget="$store.state.settings.currentTimer"
            class="grid absolute place-items-center"
          />
          <timer-controls class="absolute" style="bottom: 2rem;" />
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

.schedule-transition-enter-active,
.schedule-transition-leave-active {
  transition: transform 300ms ease-out, opacity 200ms ease-out;
}

.schedule-transition-enter,
.schedule-transition-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>

<script>
// import LazyHydrate from 'vue-lazy-hydration'

export default {
  layout: 'timer',
  components: {
    Ticker: () => import(/* webpackChunkName: "ticker", webpackMode: "eager" */ '@/components/ticker.vue'),
    ScheduleDisplay: () => import(/* webpackChunkName: "schedule", webpackPreload: true */ '@/components/schedule/scheduleDisplay.vue'),
    NotificationController: () => import(/* webpackChunkName: "notificationController", webpackMode: "eager" */ '@/components/notifications/notificationController.vue'),
    TimerProgress: () => import(/* webpackChunkName: "progress", webpackPreload: true */ '@/components/timer/timerProgress.vue'),
    TimerSwitch: () => import(/* webpackChunkName: "timerSwitch", webpackPreload: true */ '@/components/timer/display/_timerSwitch.vue'),
    // TimerControls: () => import(/* webpackChunkName: "timerControls", webpackPreload: true */ '@/components/timer/timerControls.vue'),
    TimerControls: () => import(/* webpackChunkName: "timerControls", webpackPreload: true */ '@/components/timer/controls/basic.vue'),
    SettingsPanel: () => import(/* webpackChunkName: "settings", webpackPrefetch: true */ '@/components/settings/settingsPanel.vue'),
    UiButton: () => import(/* webpackChunkName: "uibase", webpackPreload: true */ '@/components/base/button.vue'),
    UiOverlay: () => import(/* webpackChunkName: "uibase", webpackPreload: true */ '@/components/base/overlay.vue'),
    CogIcon: () => import(/* webpackChunkName: "icons" */ 'vue-material-design-icons/Cog.vue'),
    LazyHydrate: () => import(/* webpackMode: "eager" */ 'vue-lazy-hydration')
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
      title: `(${this.remainingTimeString}) ${this.pageTitle}`,
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
