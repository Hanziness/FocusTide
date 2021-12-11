<template>
  <div class="timer-control-panel-basic ">
    <div
      class="control-button text-lg z-10 lower-z prev"
      :class="[{ 'disabled': $store.getters['schedule/getCurrentTimerState'] === 0 }]"
      :aria-disabled="$store.getters['schedule/getCurrentTimerState'] === 0"
      @click="reset"
    >
      <div>
        <icon-stop :size="24" :title="$i18n.t('controls.stop')" />
      </div>
    </div>

    <div
      class="control-button -mt-6 -mb-6 rounded-full text-xl shadow-xl p-4 play-button"
      aria-label="button"
      :class="[{ 'active': $store.getters['schedule/getCurrentTimerState'] === 1 }]"
      :style="{ '--next': $store.getters['schedule/nextScheduleColour'],
                '--old': $store.getters['schedule/currentScheduleColour'],
                '--percentage': ((progressPercentage * 100) * 0.85 + 10) + '%' }"
      @click="playPause"
    >
      <transition name="transition-fade" mode="out-in" tag="div" class="">
        <div v-if="$store.getters['schedule/getCurrentTimerState'] !== 1" :key="1" class="relative">
          <icon-play :size="64" :title="$i18n.t('controls.start')" />
        </div>
        <div v-else :key="2" class="relative">
          <icon-pause :size="64" :title="$i18n.t('controls.pause')" />
        </div>
      </transition>
    </div>

    <div
      class="control-button text-lg lower-z next"
      :class="[{ 'disabled': $store.getters['schedule/getCurrentTimerState'] === 1 }]"
      :aria-disabled="$store.getters['schedule/getCurrentTimerState'] === 1"
      @click="advance"
    >
      <div>
        <icon-skip-next :size="24" :title="$i18n.t('controls.next')" />
      </div>
    </div>
  </div>
</template>

<script>
import IconPlay from 'vue-material-design-icons/Play.vue'
import IconPause from 'vue-material-design-icons/Pause.vue'
import IconStop from 'vue-material-design-icons/Stop.vue'
import IconSkipNext from 'vue-material-design-icons/SkipNext.vue'
import KeyboardListener from '@/assets/mixins/keyboardListener'

import { TimerState } from '@/store/schedule'

export default {
  components: {
    // UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/base/button.vue'),
    IconPlay,
    IconPause,
    IconStop,
    IconSkipNext
  },

  mixins: [KeyboardListener],

  computed: {
    progressPercentage () {
      return this.$store.getters['schedule/getCurrentItem'].timeElapsed / this.$store.getters['schedule/getCurrentItem'].length
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
div.timer-control-panel-basic {
  @apply p-2 bg-transparent flex flex-row items-center mb-4;

  width: max-content;
  z-index: 10;

  & > div.control-button:first-child {
    @apply rounded-l-lg -mr-2;
  }

  & > div.control-button:last-child {
    @apply rounded-r-lg -ml-2;
  }

  & > div.control-button:not(.play-button) {
    @apply p-3 px-4 shadow-md uppercase;
  }

  & > div.control-button.prev {
    @apply pr-5;
  }

  & > div.control-button.next {
    @apply pl-5;
  }
}

.lower-z {
  z-index: -2;
}

div.control-button {
  @apply bg-gray-200 cursor-pointer;
  @apply dark:bg-gray-800;

  transition: background-color 200ms ease-out;

  &:not(.play-button):hover {
    @apply bg-gray-300 dark:bg-gray-600;
  }

  & > * {
    transition: opacity 300ms ease-out;
  }

  &.disabled {
    pointer-events: none;

    & > * {
      opacity: 0.4;
    }
  }
}

div.play-button {
  position: relative;
}

div.play-button::before,
div.play-button::after {
  @apply rounded-full;

  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  background: conic-gradient(var(--next) 0%, var(--next) var(--percentage), var(--old) var(--percentage), var(--old) 100%);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  transition: opacity 200ms ease-out;
  animation: spinbg 1s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
  animation-fill-mode: forwards;
  animation-play-state: paused;
  opacity: 0;
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
