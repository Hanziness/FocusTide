<script setup lang="ts">
import { TimerState, useSchedule } from '~~/stores/schedule'

const scheduleStore = useSchedule()
const running = computed(() => scheduleStore.getCurrentTimerState === TimerState.RUNNING)
const emit = defineEmits<{(event: 'tick', timeString: string): void }>()

const timerValue = computed(() => {
  const completeRounded = Math.round((scheduleStore.getCurrentItem.length - scheduleStore.getCurrentItem.timeElapsed) / 1000)
  const totalRounded = Math.round(scheduleStore.getCurrentItem.length / 1000)
  const percentageValue = Math.round(((totalRounded - completeRounded) / totalRounded) * 100)

  emit('tick', `${percentageValue}%`)
  return percentageValue
})
</script>

<template>
  <div class="flex flex-row items-center gap-4 select-none timer-percentage timer-display" :class="[{ 'active': running }]">
    <transition name="transition-percentage" tag="span" mode="out-in">
      <span
        :key="timerValue"
        :style="{ 'width': `${Math.max(1, Math.ceil(Math.log10(timerValue + 1)))}ch` }"
        class="relative inline-block text-9xl md:text-[14rem] font-bold"
        v-text="timerValue"
      />
    </transition>
    <span class="text-4xl md:text-8xl">%</span>
  </div>
</template>

<style lang="scss" scoped>
.transition-percentage-enter-active,
.transition-percentage-leave-active {
  transition: 300ms ease-out;
  transition-property: opacity, transform !important;
}

.transition-percentage-enter {
  opacity: 0 !important;
  transform: translateY(60px);
}

.transition-percentage-leave-to {
  opacity: 0 !important;
  transform: translateY(-60px);
}
</style>
