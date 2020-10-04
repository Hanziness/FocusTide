<template>
  <transition name="schedule-transition">
    <transition-group
      v-if="$store.state.settings.schedule.showSchedule"
      name="list"
      tag="div"
      class="p-4 bg-gray-800 flex flex-grow-0 flex-row p-0 rounded-lg schedule-container shadow-lg overflow-hidden"
    >
      <schedule-item
        v-for="(item, i) in $store.getters['events/getSchedule']"
        :key="item._index"
        :data="item"
        :active="i === 0"
      />
    </transition-group>
  </transition>
</template>

<style lang="scss" scoped>
div.schedule-container {
  z-index: 10;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: 500ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px);
}

.list-enter-to {
  // opacity: 1;
  transform: translateX(0);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0 !important;
  transform: translateX(-50px);
  // transform-origin: center top;
}

.schedule-transition-enter-active,
.schedule-transition-leave-active {
  transition: opacity 300ms ease-in, transform 300ms ease-in;
}

.schedule-transition-enter,
.schedule-transition-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>

<script>
import ScheduleItem from '@/components/tailwinded/schedule/scheduleItem.vue'

export default {
  components: {
    ScheduleItem
  }
}
</script>

<style lang="scss">
.schedule-container {
  // height: 64px;
}
</style>
