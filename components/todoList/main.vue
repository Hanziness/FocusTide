<template>
  <div class="px-4 py-4 border-gray-400 shadow-lg bg-gray-50 dark:bg-gray-800 dark:text-slate-50 border-opacity-20 md:border md:py-3" @keyup.stop="">
    <div class="relative flex flex-row items-center justify-center h-10">
      <p class="text-xl font-bold tracking-tighter text-gray-800 uppercase dark:text-gray-100" v-text="$t('tasks.title')" />
      <div class="absolute right-0 float-right -mr-2">
        <Button circle default-style :importance="3" @click="$emit('hide')">
          <XIcon />
        </Button>
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
        :manage="!scheduleStore.isRunning && manageMode"
        :item="task"
        :droptarget="task === dropTarget"
        moveable
        @input="(isCompleted) => tasklistStore.setComplete(task.id, isCompleted)"
        @update="newTitle => tasklistStore.editTitle({ id: task.id, newTitle })"
        @delete="tasklistStore.deleteTask({ item: task })"
        @dropstart="draggedItem = task, dragging = true"
        @dropfinish="handleDrop"
        @droptarget="updateDropTarget"
      />
    </transition-group>
    <TaskAdd class="mt-3" />
  </div>
</template>

<script>
// import { EditIcon } from 'vue-tabler-icons'
import { XIcon } from 'vue-tabler-icons'

import { mapStores } from 'pinia'
import Button from '@/components/base/button.vue'
import TaskItem from '@/components/todoList/item.vue'
import TaskAdd from '@/components/todoList/addTask.vue'
import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'
import { useTasklist } from '~~/stores/tasklist'

export default {
  components: { TaskItem, TaskAdd, XIcon, Button /* IconManage: EditIcon */ },
  data () {
    return {
      manageMode: true,

      /** Is a task being dragged to another place? */
      dragging: false,
      /** The task that is being moved */
      draggedItem: null,
      /** The task that the moved item will be dropped onto */
      dropTarget: null
    }
  },
  computed: {
    ...mapStores(useSettings, useSchedule, useTasklist),

    displayedTasks: {
      get () {
        let tasks = this.tasklistStore.sortedTasks

        // only return tasks from the current section type if the timer is running
        if (this.scheduleStore.isRunning) {
          tasks = tasks
            .filter(task => task.section === this.scheduleStore.getCurrentItem.type)

          // only show first few tasks in this section (according to settings)
          if (this.settingsStore.tasks.maxActiveTasks > 0) {
            tasks = tasks.slice(0, this.settingsStore.tasks.maxActiveTasks)
          }
        }

        return tasks
      }
    }
  },
  methods: {
    updateDropTarget (item) {
      this.dropTarget = item
    },

    handleDrop () {
      // move `draggedItem` around `dropTarget`
      const newIndex = this.tasklistStore.tasks.indexOf(this.dropTarget)
      this.tasklistStore.moveItem({ item: this.draggedItem, newIndex })

      // reset drag-and-drop variables
      this.draggedItem = null
      this.dragging = false
      this.dropTarget = null
    }
  }
}
</script>

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
