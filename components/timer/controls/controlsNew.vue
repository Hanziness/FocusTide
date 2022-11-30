<script setup>
import { PlayerPlayIcon, PlayerPauseIcon, PlayerStopIcon, PlayerTrackNextIcon } from 'vue-tabler-icons'
import CButton from '~~/components/base/uiButton.vue'
import { TimerState, useSchedule } from '~~/stores/schedule'

const scheduleStore = useSchedule()

const reset = () => {
  if (scheduleStore.timerState !== TimerState.COMPLETED && scheduleStore.items[0].timeElapsed > scheduleStore.items[0].length) {
    scheduleStore.timerState = TimerState.COMPLETED
  } else {
    scheduleStore.timerState = TimerState.STOPPED
  }
}

const playPause = () => {
  scheduleStore.timerState = scheduleStore.timerState === TimerState.RUNNING ? TimerState.PAUSED : TimerState.RUNNING
}

const advance = () => {
  scheduleStore.timerState = TimerState.STOPPED
  scheduleStore.advance()
}
</script>

<template>
  <div class="flex items-center justify-center gap-5 md:gap-8">
    <CButton
      circle
      inner-class="p-5"
      bg-class="bg-themed"
      :importance="1"
      class="h-16 transition secondary"
      :class="{ 'scale-0 opacity-0 pointer-events-none' : !scheduleStore.isRunning }"
      @click="reset"
    >
      <PlayerStopIcon :size="24" />
    </CButton>

    <CButton inner-class="p-6 px-8 text-white transition dark:text-inherit" bg-class="rounded-full bg-themed" :importance="1" class="play" @click="playPause">
      <PlayerPlayIcon v-if="scheduleStore.timerState !== TimerState.RUNNING" :size="28" />
      <PlayerPauseIcon v-else :size="28" />
    </CButton>

    <CButton
      circle
      inner-class="p-5"
      bg-class="bg-themed"
      :importance="1"
      class="h-16 transition secondary"
      :class="{ 'scale-0 opacity-0 pointer-events-none' : scheduleStore.timerState === TimerState.RUNNING }"
      @click="advance()"
    >
      <PlayerTrackNextIcon :size="24" />
    </CButton>
  </div>
</template>

<style scoped>
.play {
  --theme: 21 21 21;
}

.dark .play {
  --theme: 220 220 220;

  color: black;
}

.secondary {
  --theme: 114 247 152;
}

.dark .secondary {
  --theme: 28 107 50;
}
</style>
