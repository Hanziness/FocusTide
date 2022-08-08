<template>
  <div class="flex flex-row justify-center w-full p-4 overflow-hidden select-none">
    <TransitionGroup
      enter-active-class="transition duration-300 delay-150"
      leave-active-class="absolute transition duration-300"
      enter-from-class="translate-x-8 !opacity-0"
      move-class="transition duration-300 delay-150"
      leave-to-class="scale-90 opacity-0"
      tag="div"
      class="relative flex flex-row flex-grow-0 gap-2"
    >
      <schedule-item
        v-for="(item, i) in getSchedule"
        :key="item.id"
        :type="item.type"
        :active="i === 0"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useSchedule } from '~~/stores/schedule'

import ScheduleItem from '@/components/schedule/scheduleItem.vue'

export default {
  components: {
    ScheduleItem
  },

  computed: {
    ...mapState(useSchedule, ['getSchedule'])
  }
}
</script>
