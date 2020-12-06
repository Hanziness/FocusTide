<template>
  <div class="timer-control-panel-basic p-2 bg-transparent flex flex-row items-center mb-4">
    <div
      class="control-button rounded-l-lg -mr-2 text-lg p-3 px-4 lower-z"
      @click="$store.commit('schedule/advance')"
    >
      <p>SKIP</p>
    </div>
    <div
      class="control-button -mt-6 -mb-6 rounded-full text-xl shadow-xl p-4 play-button"
      aria-label="button"
      :class="[{ 'active': $store.getters['schedule/getCurrentTimerState'] === 1,
                 'disabled': $store.getters['schedule/getCurrentTimerState'] === 3 }]"
      :style="{ '--next': $store.getters['schedule/nextScheduleColour'],
                '--old': $store.getters['schedule/currentScheduleColour'],
                '--percentage': ((progressPercentage * 100) * 0.85 + 10) + '%' }"
      @click="$store.commit('schedule/updateTimerState', $store.getters['schedule/getCurrentTimerState'] !== 1 ? 1 : 2)"
    >
      <transition name="transition-fade" mode="out-in" tag="div" class="">
        <div v-if="$store.getters['schedule/getCurrentTimerState'] !== 1" :key="1" class="relative">
          <icon-play :size="64" />
        </div>
        <div v-else :key="2" class="relative">
          <icon-pause :size="64" />
        </div>
      </transition>
    </div>
    <div
      class="control-button rounded-r-lg -ml-2 text-lg z-10 p-3 px-4 lower-z"
      :class="[{ 'disabled': $store.getters['schedule/getCurrentTimerState'] === 0 }]"
      :aria-disabled="$store.getters['schedule/getCurrentTimerState'] === 0"
      @click="$store.commit('schedule/updateTimerState', 0)"
    >
      <p>STOP</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.disabled {
  pointer-events: none;

  & > * {
    opacity: 0.6;
  }
}

.lower-z {
  z-index: -2;
}

div.timer-control-panel-basic {
  width: max-content;
  z-index: 10;
}

div.control-button {
  @apply bg-gray-300 cursor-pointer;

  & > * {
    transition: opacity 300ms ease-out;
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

div.play-button.active::before,
div.play-button.active::after {
  animation-play-state: running;
  opacity: 1;
}

@keyframes spinbg {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

div.play-button::after {
  filter: blur(10px);
  opacity: 20%;
}
</style>

<script>
export default {
  components: {
    // UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/tailwinded/base/button.vue'),
    IconPlay: () => import('vue-material-design-icons/Play.vue'),
    IconPause: () => import('vue-material-design-icons/Pause.vue')
  },

  computed: {
    progressPercentage () {
      return this.$store.getters['schedule/getCurrentItem'].timeElapsed / this.$store.getters['schedule/getCurrentItem'].length
    }
  }
}
</script>
