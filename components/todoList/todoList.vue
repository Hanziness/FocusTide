<script setup lang="ts">
import { IconX } from '@tabler/icons-vue'

import { ButtonImportance, ButtonTheme } from '../base/types/button'
import ControlButton from '~~/components/base/uiButton.vue'
import TaskItem from '~~/components/todoList/todoItem.vue'
import TaskAdd from '@/components/todoList/addTask.vue'
import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'
import { type Task, useTasklist } from '~~/stores/tasklist'
import { useOpenPanels } from '~~/stores/openpanels'

const openPanels = useOpenPanels()
const settingsStore = useSettings()
const tasklistStore = useTasklist()
const scheduleStore = useSchedule()

const state = reactive({
  manageMode: true,

  /** Is a task being dragged to another place? */
  dragging: false,
  /** The task that is being moved */
  draggedItem: null as Task | null,
  /** The task that the moved item will be dropped onto */
  dropTarget: null as Task | null
})

const displayedTasks = computed(() => {
  let tasks = tasklistStore.sortedTasks

  // only return tasks from the current section type if the timer is running
  if (scheduleStore.isRunning) {
    tasks = tasks
      .filter(task => task.section === scheduleStore.getCurrentItem.type)

    // only show first few tasks in this section (according to settings)
    if (settingsStore.tasks.maxActiveTasks > 0) {
      tasks = tasks.slice(0, settingsStore.tasks.maxActiveTasks)
    }
  }

  return tasks
})

const updateDropTarget = (item: unknown) => {
  if (['id', 'title', 'state'].every(key => Object.keys(item as Record<string, unknown>).includes(key))) {
    state.dropTarget = item as Task
  }
}

const handleDrop = () => {
  // move `draggedItem` around `dropTarget`
  const newIndex = tasklistStore.tasks.indexOf(state.dropTarget as Task)
  tasklistStore.moveItem(state.draggedItem as Task, newIndex)

  // reset drag-and-drop variables
  state.draggedItem = null
  state.dragging = false
  state.dropTarget = null
}

</script>

<template>
  <div class="px-4 py-4 shadow-lg border-surface-dark dark:border-surface-light bg-surface-variant text-surface-onvariant dark:bg-surface-darkvariant dark:text-surface-ondarkvariant border-opacity-20 dark:border-opacity-20 md:border md:py-3" @keyup.stop="">
    <div class="relative flex flex-row items-center justify-center h-10">
      <p class="text-xl font-bold tracking-tighter text-gray-800 uppercase dark:text-gray-100" v-text="$t('tasks.title')" />
      <div class="absolute right-0 float-right -mr-2">
        <ControlButton circle default-style :theme="ButtonTheme.Primary" :importance="ButtonImportance.Text" @click="openPanels.todo = false">
          <IconX />
        </ControlButton>
      </div>
    </div>
    <div v-show="displayedTasks.length < 1" key="notask" class="mt-3 italic text-black dark:text-gray-200 text-opacity-70" v-text="$t('tasks.empty')" />
    <transition-group
      tag="div"
      name="transition-item"
      class="flex flex-col px-2 py-1 mt-2 -mx-2 space-y-2 overflow-x-hidden overflow-y-auto max-h-64"
    >
      <TaskItem
        v-for="task in displayedTasks"
        :key="task.id"
        :manage="!scheduleStore.isRunning && state.manageMode"
        :item="task"
        :droptarget="task === state.dropTarget"
        moveable
        @input="(isCompleted) => tasklistStore.setComplete(task.id, isCompleted)"
        @update="newTitle => tasklistStore.editTitle(task.id, newTitle)"
        @delete="tasklistStore.deleteTask(task)"
        @dropstart="state.draggedItem = task, state.dragging = true"
        @dropfinish="handleDrop"
        @droptarget="updateDropTarget"
      />
    </transition-group>
    <TaskAdd class="mt-3" />
  </div>
</template>

<style lang="scss">
.transition-item-enter {
  @apply opacity-0 translate-y-2;
}

.transition-item-leave-to {
  @apply opacity-0 translate-x-4;
}

.transition-item-move {
  @apply transition-transform duration-75;
}
</style>
