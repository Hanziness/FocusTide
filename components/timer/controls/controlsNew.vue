<script setup lang="ts">
import { IconPlayerPlay, IconPlayerPause, IconPlayerStop, IconPlayerTrackNext } from '@tabler/icons-vue'
import { ButtonImportance, ButtonTheme } from '~~/components/base/types/button'
import CButton from '~~/components/base/uiButton.vue'
import { TimerState, useSchedule } from '~~/stores/schedule'

const scheduleStore = useSchedule()

const reset = () => {
  if (scheduleStore.timerState !== TimerState.COMPLETED && scheduleStore.getSchedule[0].timeElapsed > scheduleStore.getSchedule[0].length) {
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
      :theme="ButtonTheme.Secondary"
      :importance="ButtonImportance.Filled"
      class="h-16 transition"
      :class="{ 'scale-0 opacity-0 pointer-events-none' : !scheduleStore.isRunning }"
      :aria-label="$t('controls.stop')"
      @click="reset"
    >
      <IconPlayerStop :size="24" />
    </CButton>

    <CButton
      :aria-label="$t('controls.play')"
      inner-class="p-6 px-8 transition"
      bg-class="rounded-full"
      class="h-20 w-28"
      :theme="ButtonTheme.NeutralDark"
      :importance="ButtonImportance.Filled"
      @click="playPause"
    >
      <IconPlayerPlay v-if="scheduleStore.timerState !== TimerState.RUNNING" :size="28" />
      <IconPlayerPause v-else :size="28" />
    </CButton>

    <CButton
      :aria-label="$t('controls.advance')"
      circle
      inner-class="p-5"
      :theme="ButtonTheme.Secondary"
      :importance="ButtonImportance.Filled"
      class="h-16 transition"
      :class="{ 'scale-0 opacity-0 pointer-events-none' : scheduleStore.timerState === TimerState.RUNNING }"
      @click="advance()"
    >
      <IconPlayerTrackNext :size="24" />
    </CButton>
  </div>
</template>
