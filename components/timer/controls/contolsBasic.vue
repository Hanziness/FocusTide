<template>
  <div class="w-max dark:text-gray-100 z-10 flex flex-row items-center p-2 text-gray-900 bg-transparent">
    <!-- Reset -->
    <div
      role="button"
      class="dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 -z-20 py-3 pl-4 pr-5 -mr-2 text-lg transition-colors bg-gray-200 rounded-l-lg shadow-md cursor-pointer"
      :class="[{ 'pointer-events-none': !resetEnabled }]"
      :aria-disabled="!resetEnabled"
      :aria-label="$i18n.t('controls.stop')"
      tabindex="0"
      @click="reset"
    >
      <IconStop :aria-label="$i18n.t('controls.stop')" class="transition-opacity duration-300" :class="[{ 'opacity-40': !resetEnabled }]" size="24" :title="$i18n.t('controls.stop')" />
    </div>

    <!-- Play/pause -->
    <div
      class="dark:bg-gray-800 active:bg-gray-300 dark:active:bg-gray-700 play-button relative p-4 text-xl transition-colors bg-gray-200 rounded-full shadow-xl cursor-pointer"
      role="button"
      :aria-label="$i18n.t('controls.play')"
      tabindex="0"
      :class="[{ 'active': $store.getters['schedule/getCurrentTimerState'] === 1 }]"
      :style="{ '--next': $store.getters['schedule/nextScheduleColour'],
                '--old': $store.getters['schedule/currentScheduleColour'],
                '--percentage': ((progressPercentage * 100) * 0.85 + 10) + '%' }"
      @click="playPause"
    >
      <Transition name="transition-fade" mode="out-in" tag="div" class="">
        <div v-if="$store.getters['schedule/getCurrentTimerState'] !== 1" :key="1" class="relative">
          <IconPlay :aria-label="$i18n.t('controls.play')" size="64" stroke-width="1" />
        </div>
        <div v-else :key="2" class="relative">
          <IconPause :aria-label="$i18n.t('controls.play')" size="64" stroke-width="1" />
        </div>
      </Transition>
    </div>

    <!-- Advance -->
    <div
      role="button"
      :aria-label="$i18n.t('controls.advance')"
      :aria-disabled="!advanceEnabled"
      class="dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 -z-20 py-3 pl-5 pr-4 -ml-2 text-lg transition-colors bg-gray-200 rounded-r-lg shadow-md cursor-pointer"
      :class="[{ 'pointer-events-none': !advanceEnabled }]"
      tabindex="0"
      @click="advance"
    >
      <IconSkipNext :aria-label="$i18n.t('controls.advance')" class="transition-opacity duration-300" :class="[{ 'opacity-40': !advanceEnabled }]" size="24" />
    </div>
  </div>
</template>

<script>
import { PlayerPlayIcon, PlayerPauseIcon, PlayerStopIcon, PlayerSkipForwardIcon } from 'vue-tabler-icons'
import KeyboardListener from '@/assets/mixins/keyboardListener'

import { TimerState } from '@/store/schedule'

export default {
  components: {
    // UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/base/button.vue'),
    IconPlay: PlayerPlayIcon,
    IconPause: PlayerPauseIcon,
    IconStop: PlayerStopIcon,
    IconSkipNext: PlayerSkipForwardIcon
  },

  mixins: [KeyboardListener],

  computed: {
    progressPercentage () {
      return this.$store.getters['schedule/getCurrentItem'].timeElapsed / this.$store.getters['schedule/getCurrentItem'].length
    },

    resetEnabled () {
      return this.$store.getters['schedule/getCurrentTimerState'] !== 0
    },

    advanceEnabled () {
      return this.$store.getters['schedule/getCurrentTimerState'] !== 1
    }
  },

  methods: {
    mixin_keyboardListener_handleKeyUp (e) {
      if (!this.canUseKeyboard || !this.$store.state.settings.timerControls.enableKeyboardShortcuts) { return }
      if (e.code.toLowerCase() === 'space') {
        this.playPause()
      }
    },

    playPause () {
      // move to next section if timer is completed
      if (this.$store.getters['schedule/getCurrentTimerState'] === TimerState.COMPLETED) {
        this.advance()
        this.$store.commit('schedule/updateTimerState', TimerState.TICKING)
      } else {
        this.$store.commit('schedule/updateTimerState', this.$store.getters['schedule/getCurrentTimerState'] !== TimerState.TICKING ? TimerState.TICKING : TimerState.PAUSED)
      }
    },

    reset () {
      this.$store.commit('schedule/updateTimerState', TimerState.RESET)
    },

    advance () {
      this.$store.commit('schedule/advance')
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
