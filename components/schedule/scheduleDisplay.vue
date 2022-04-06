<template>
  <div class="select-none overflow-hidden w-full p-4">
    <TransitionGroup
      name="schedule-transition"
      tag="div"
      class="flex flex-grow-0 flex-row justify-center relative"
    >
      <ScheduleItem
        v-for="(item, i) in $store.getters['schedule/getSchedule']"
        :key="item.id"
        :data="item"
        :active="i === 0"
      />
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  components: {
    ScheduleItem: () => import(/* webpackMode: "eager" */ '@/components/schedule/scheduleItem.vue')
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
