<template>
  <div class="rounded-lg bg-gray-800 z-10 shadow-lg select-none overflow-hidden">
    <transition-group
      name="transition-schedule"
      tag="div"
      class="schedule-container"
    >
      <schedule-item
        v-for="(item, i) in $store.getters['schedule/getSchedule']"
        :key="item.id"
        :data="item"
        :active="i === 0"
      />
    </transition-group>
    <div v-if="$store.state.settings.schedule.visibility.showSectionType" class="section-type">
      {{ $i18n.t('section.' + this.$store.getters['schedule/getCurrentItem'].type).toLowerCase() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.schedule-container {
  @apply p-4 flex flex-grow-0 flex-row overflow-hidden;

  div.schedule-item {
    &.transition-schedule-enter-active,
    &.transition-schedule-leave-active,
    &.transition-schedule-move {
      transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
      transition-property: opacity, transform;
    }

    &.transition-schedule-enter {
      opacity: 0;
      transform: translateX(50px);
    }

    &.transition-schedule-enter-to {
      transform: translateX(0);
    }

    &.transition-schedule-leave-active {
      position: absolute;
    }

    &.transition-schedule-leave-to {
      opacity: 0 !important;
      transform: translateX(-50px);
    }
  }
}

div.section-type {
  @apply bg-gray-700 text-center text-gray-50 py-2;
}
</style>

<script>
export default {
  components: {
    ScheduleItem: () => import(/* webpackMode: "eager" */ '@/components/schedule/scheduleItem.vue')
  }
}
</script>
