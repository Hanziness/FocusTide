<template>
  <div class="z-10 flex flex-row items-center p-2 text-gray-900 bg-transparent w-max dark:text-gray-100">
    <!-- Reset -->
    <div
      role="button"
      class="py-3 pl-4 pr-5 -mr-2 text-lg transition-colors bg-gray-200 rounded-l-lg shadow-md cursor-pointer dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 -z-20"
      :class="[{ 'pointer-events-none': !resetEnabled }]"
      :aria-disabled="!resetEnabled"
      :aria-label="$t('controls.stop')"
      tabindex="0"
      @click="reset"
    >
      <Component
        :is="stopResetIcon"
        :aria-label="$t('controls.stop')"
        class="transition-opacity duration-300"
        :class="[{ 'opacity-40': !resetEnabled }]"
        size="24"
        :title="$t('controls.stop')"
      />
    </div>

    <!-- Play/pause -->
    <div
      class="relative p-4 text-xl transition-colors bg-gray-200 rounded-full shadow-xl cursor-pointer dark:bg-gray-800 active:bg-gray-300 dark:active:bg-gray-700 play-button"
      role="button"
      :aria-label="$t('controls.play')"
      tabindex="0"
      :class="[{ 'active': scheduleStore.getCurrentTimerState === 1 }]"
      :style="{ '--next': scheduleStore.nextScheduleColour,
                '--old': scheduleStore.currentScheduleColour,
                '--percentage': ((progressPercentage * 100) * 0.85 + 10) + '%' }"
      @click="playPause"
    >
      <Transition name="transition-fade" mode="out-in" tag="div" class="">
        <div v-if="scheduleStore.getCurrentTimerState !== 1" :key="1" class="relative">
          <IconPlay :aria-label="$t('controls.play')" size="64" stroke-width="1" />
        </div>
        <div v-else :key="2" class="relative">
          <IconPause :aria-label="$t('controls.play')" size="64" stroke-width="1" />
        </div>
      </Transition>
    </div>

    <!-- Advance -->
    <div
      role="button"
      :aria-label="$t('controls.advance')"
      :aria-disabled="!advanceEnabled"
      class="py-3 pl-5 pr-4 -ml-2 text-lg transition-colors bg-gray-200 rounded-r-lg shadow-md cursor-pointer dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 -z-20"
      :class="[{ 'pointer-events-none': !advanceEnabled }]"
      tabindex="0"
      @click="advance"
    >
      <IconSkipNext :aria-label="$t('controls.advance')" class="transition-opacity duration-300" :class="[{ 'opacity-40': !advanceEnabled }]" size="24" />
    </div>
  </div>
</template>

<script>
import { PlayerPlayIcon, PlayerPauseIcon, PlayerStopIcon, PlayerSkipForwardIcon, PlayerSkipBackIcon } from 'vue-tabler-icons'
import { mapStores } from 'pinia'
import KeyboardListener from '@/assets/mixins/keyboardListener'

import { TimerState, useSchedule } from '~~/stores/schedule'
import { useSettings } from '~~/stores/settings'
import { EventType, useEvents } from '~~/stores/events'

export default {
  components: {
    // UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/base/button.vue'),
    IconPlay: PlayerPlayIcon,
    IconPause: PlayerPauseIcon,
    IconStop: PlayerStopIcon,
    IconSkipNext: PlayerSkipForwardIcon,
    IconReset: PlayerSkipBackIcon
  },

  mixins: [KeyboardListener],

  computed: {
    ...mapStores(useSettings, useSchedule, useEvents),

    progressPercentage () {
      return this.scheduleStore.getCurrentItem.timeElapsed / this.scheduleStore.getCurrentItem.length
    },

    resetEnabled () {
      return this.scheduleStore.getCurrentTimerState !== TimerState.STOPPED
    },

    advanceEnabled () {
      return this.scheduleStore.getCurrentTimerState !== TimerState.RUNNING
    },

    stopResetIcon () {
      const elapsed = this.scheduleStore.items[0].timeElapsed
      const total = this.scheduleStore.items[0].length
      if (elapsed >= total && this.scheduleStore.isRunning) {
        return PlayerStopIcon
      }

      return PlayerSkipBackIcon
    }
  },

  methods: {
    mixin_keyboardListener_handleKeyUp (e) {
      if (!this.canUseKeyboard || !this.settingsStore.timerControls.enableKeyboardShortcuts) { return }
      if (e.code.toLowerCase() === 'space') {
        this.playPause()
      }
    },

    playPause () {
      // move to next section if timer is completed
      if (this.scheduleStore.getCurrentTimerState === TimerState.COMPLETED) {
        this.advance()
        this.scheduleStore.timerState = TimerState.RUNNING
      } else {
        this.scheduleStore.timerState = this.scheduleStore.getCurrentTimerState !== TimerState.RUNNING ? TimerState.RUNNING : TimerState.PAUSED
      }
    },

    reset () {
      if (this.scheduleStore.timerState !== TimerState.COMPLETED && this.scheduleStore.items[0].timeElapsed > this.scheduleStore.items[0].length) {
        this.scheduleStore.timerState = TimerState.COMPLETED
      } else {
        this.scheduleStore.timerState = TimerState.STOPPED
      }
    },

    advance () {
      this.scheduleStore.advance()
      this.scheduleStore.timerState = TimerState.STOPPED
      this.eventsStore.recordEvent(EventType.SCHEDULE_ADVANCE_MANUAL, { next: this.scheduleStore.getSchedule[0].type })
    }
  }
}
</script>

<style lang="scss" scoped>
div.play-button::before,
div.play-button::after {
  @apply rounded-full absolute transition-opacity opacity-0 -z-10;

  content: '';
  left: -2px;
  top: -2px;
  background: conic-gradient(var(--next) 0%, var(--next) var(--percentage), var(--old) var(--percentage), var(--old) 100%);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: spinbg 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-fill-mode: forwards;
  animation-play-state: paused;
}

div.play-button::after {
  filter: blur(6px);
}

div.play-button.active::before,
div.play-button.active::after {
  animation-play-state: running;
  opacity: 1;
}

div.play-button:not(.active):hover::before,
div.play-button:not(.active):hover::after {
  opacity: 0.6;
}

@keyframes spinbg {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

</style>
