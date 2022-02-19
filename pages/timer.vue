<template>
  <section :class="['timer-section', {'dark' : $store.state.settings.visuals.darkMode }]">
    <!-- Dark mode background override -->
    <div class="absolute w-full h-full dark:bg-gray-900" />

    <!-- Settings button -->
    <UiButton :aria-label="$i18n.t('settings.heading')" subtle :class="['absolute', { 'pointer-events-none': preview }]" style="top: 0.5rem; right: 0.5rem; z-index: 10;" @click="showSettings = true">
      <CogIcon class="dark:text-gray-200" :aria-label="$i18n.t('settings.heading')" />
    </UiButton>
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
          class="relative w-full h-full flex justify-center"
        >
          <Transition name="schedule-transition">
            <ScheduleDisplay
              v-if="$store.state.settings.schedule.visibility.enabled"
              class="absolute ml-auto mr-auto"
              style="top: 2rem;"
            />
          </Transition>

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
            class="grid absolute place-items-center"
            @tick="timeString = $event"
          />
          <TimerControls :class="['absolute', { 'pointer-events-none': preview }]" style="bottom: 2rem;" :can-use-keyboard="!preview && !showSettings" />
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
    UiButton: () => import(/* webpackChunkName: "uibase", webpackPrefetch: true */ '@/components/base/button.vue'),
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
