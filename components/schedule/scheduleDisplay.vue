<template>
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
</template>

<style lang="scss" scoped>
div.schedule-container {
  @apply p-4 bg-gray-800 flex flex-grow-0 flex-row rounded-lg shadow-lg overflow-hidden;

  z-index: 10;
}

div.schedule-item.transition-schedule-enter-active,
div.schedule-item.transition-schedule-leave-active,
div.schedule-item.transition-schedule-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

div.schedule-item.transition-schedule-enter {
  opacity: 0;
  transform: translateX(50px);
}

div.schedule-item.transition-schedule-enter-to {
  transform: translateX(0);
}

div.schedule-item.transition-schedule-leave-active {
  position: absolute;
}

div.schedule-item.transition-schedule-leave-to {
  opacity: 0 !important;
  transform: translateX(-50px);
}
</style>

<script>
export default {
  components: {
    ScheduleItem: () => import(/* webpackMode: "eager" */ '@/components/schedule/scheduleItem.vue')
  }
}
</script>
