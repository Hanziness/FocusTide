<script setup lang="ts">
import TaskItem from './todoItem.vue'
import { TaskState, useTasklist } from '~~/stores/tasklist'
import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'

const tasklistStore = useTasklist()
const settingsStore = useSettings()
const scheduleStore = useSchedule()

const tasks = computed(() => {
  let tasks = tasklistStore.sortedTasks
    .filter(task => task.section === scheduleStore.getCurrentItem.type)

  if (settingsStore.tasks.maxActiveTasks > 0) {
    tasks = tasks.slice(0, settingsStore.tasks.maxActiveTasks)
  }

  return tasks
})
</script>

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
      @input="tasklistStore.setComplete(task.id, task.state !== TaskState.complete)"
      @delete="tasklistStore.deleteTask(task)"
    />
  </transition-group>
</template>
