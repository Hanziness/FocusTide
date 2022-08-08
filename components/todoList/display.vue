<template>
  <transition-group
    class="flex flex-col w-full max-w-sm gap-2 px-4"
    enter-from-class="translate-y-2 opacity-0"
    enter-active-class="transition"
    leave-to-class="-translate-y-2 opacity-0"
    leave-active-class="transition"
  >
    <TaskItem
      v-for="task in tasks"
      :key="task.section + '-' + task.title"
      :manage="false"
      :draggable="false"
      :item="task"
      class="!border-l-0"
      @input="tasklistStore.toggleComplete({ item: task })"
      @delete="tasklistStore.deleteTask({ item: task })"
    />
  </transition-group>
</template>

<script>
import { mapState, mapStores } from 'pinia'
import Item from './item.vue'
import { useTasklist } from '~~/stores/tasklist'
import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'
export default {
  components: { TaskItem: Item },
  computed: {
    ...mapStores(useTasklist),
    ...mapState(useSettings, {
      maxActiveTasks: store => store.tasks.maxActiveTasks
    }),
    ...mapState(useSchedule, ['getCurrentItem']),

    tasks: {
      get () {
        let tasks = this.tasklistStore.sortedTasks
          .filter(task => task.section === this.getCurrentItem.type)

        if (this.maxActiveTasks > 0) {
          tasks = tasks.slice(0, this.maxActiveTasks)
        }

        return tasks
      }
    }
  }
}
</script>
