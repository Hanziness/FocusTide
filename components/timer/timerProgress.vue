<script setup lang="ts">
import { useSchedule } from '~~/stores/schedule'

const scheduleStore = useSchedule()

const props = defineProps({
  timeElapsed: {
    type: Number,
    required: true
  },
  timeOriginal: {
    type: Number,
    required: true
  },
  scheduleEntryId: {
    type: Number,
    default: 1
  },
  colour: {
    type: String,
    default: null
  },
  background: {
    type: Boolean,
    default: false
  }
})

const progressPercentage = computed(() => {
  return props.background ? 100 : Math.min((props.timeElapsed / props.timeOriginal) * 100, 100)
})
</script>

<template>
  <div class="absolute top-0 left-0 block w-full h-full transition-all">
    <div
      class="w-full h-full transition-all duration-500 transform-gpu timer-progress"
      :class="[{ 'ease-out-expo': props.background }]"
      :style="{
        'background-color': props.colour ? props.colour : scheduleStore.getScheduleColour[scheduleEntryId],
        '--transform': `translateX(${-100 + progressPercentage}%)`,
      }"
    >
      <!-- Dark mode background override -->
      <div class="absolute invisible w-full h-full bg-gray-600 dark:visible mix-blend-multiply" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.timer-progress {
  transition-timing-function: cubic-bezier(0.76, 0, 0.24, 1);
  transform: var(--transform);
}

.ease-out-expo {
  @apply duration-1000;

  transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
