<template>
  <v-sheet class="d-flex flex-row pa-0 rounded-lg schedule-container elevation-4" color="#343A40">
    <v-slide-group class="pa-0" show-arrows>
      <transition-group name="list" tag="div" class="pa-4 d-flex">
        <schedule-item
          v-for="(item, i) in $store.state.events.schedule"
          :key="item._index"
          :data="item"
          :active="i === 0"
        />
      </transition-group>
    </v-slide-group>
  </v-sheet>
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
  transform-origin: center top;
}
</style>

<script>
import ScheduleItem from '@/components/scheduleItem.vue'

export default {
  components: {
    ScheduleItem
  },
  data () {
    return {
      items: [
        {
          type: 'work',
          title: 'Work',
          length: '25 min',
          colour: 'blue lighten-3',
          progress: 30,
          active: true
        },
        {
          type: 'shortpause',
          title: 'Short pause',
          length: '5 min',
          colour: 'yellow lighten-3',
          progress: 80
        }
      ],
      progress: 0.4
    }
  }
}
</script>
