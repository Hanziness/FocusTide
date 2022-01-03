<template>
  <div class="rounded-lg bg-gray-800 z-10 shadow-lg select-none overflow-hidden">
    <TransitionGroup
      name="schedule-transition"
      tag="div"
      class="p-4 flex flex-grow-0 flex-row"
    >
      <ScheduleItem
        v-for="(item, i) in $store.getters['schedule/getSchedule']"
        :key="item.id"
        :data="item"
        :active="i === 0"
      />
    </TransitionGroup>
    <div v-if="$store.state.settings.schedule.visibility.showSectionType" class="bg-gray-700 text-center text-gray-50 py-2">
      {{ $i18n.t('section.' + $store.getters['schedule/getCurrentItem'].type).toLowerCase() }}
    </div>
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
