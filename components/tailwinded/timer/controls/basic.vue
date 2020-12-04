<template>
  <div class="timer-control-panel-basic p-2 bg-transparent flex flex-row items-center mb-4">
    <div class="control-button rounded-l-lg -mr-2 text-lg z-10 p-3 px-4">
      SKIP
    </div>
    <div
      class="control-button -mt-6 -mb-6 rounded-full text-xl z-20 shadow-xl p-4 play-button"
      aria-label="button"
      :class="[{ 'active': $store.getters['schedule/getCurrentTimerState'] === 1 }]"
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
    <div class="control-button rounded-r-lg -ml-2 text-lg z-10 p-3 px-4">
      STOP
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.timer-control-panel-basic {
  width: max-content;
  z-index: 10;
}

div.control-button {
  @apply bg-gray-300 cursor-pointer;
}

div.play-button {
  position: relative;
}

div.play-button.active::before,
div.play-button.active::after {
  @apply rounded-full;

  content: '';
  position: absolute;
  left: -2px;
  top: -2px;
  background:
    linear-gradient(
      45deg,
      #fb0094,
      #00f,
      #0f0,
      #ff0,
      #f00,
      #fb0094,
      #00f,
      #0f0,
      #ff0,
      #f00
    );
  background-size: 400%;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
  animation: flowbg 20s linear infinite;
}

@keyframes flowbg {
  0% {
    background-position: 0 0;
  }

  50% {
    background-position: 400% 0;
  }

  100% {
    background-position: 0 0;
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
  }
}
</script>
