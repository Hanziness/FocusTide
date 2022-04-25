<template>
  <div class="w-full p-4 overflow-hidden select-none">
    <TransitionGroup
      name="schedule-transition"
      tag="div"
      class="relative flex flex-row justify-center flex-grow-0"
    >
      <ScheduleItem
        v-for="(item, i) in getSchedule"
        :key="item.id"
        :data="item"
        :active="i === 0"
      />
    </TransitionGroup>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useSchedule } from '~/stores/schedule'
export default {
  components: {
    ScheduleItem: () => import(/* webpackMode: "eager" */ '@/components/schedule/scheduleItem.vue')
  },

  computed: {
    ...mapState(useSchedule, ['getSchedule'])
  }
}
</script>

<style lang="scss">
.schedule-transition-enter-active,
.schedule-transition-leave-active,
.schedule-transition-move {
  @apply transition-all duration-300;
}

.schedule-transition-enter {
  @apply opacity-0 translate-x-8;
}

.schedule-transition-leave-active {
  position: absolute;
}

.schedule-transition-leave-to {
  @apply opacity-0 -translate-x-8;
}
</style>
