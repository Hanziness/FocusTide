<template>
  <div class="px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-lg border border-gray-400 border-opacity-20 w-96" @keyup.stop="">
    <div class="flex flex-row items-center">
      <p class="uppercase text-xl text-gray-800 dark:text-gray-100 font-bold tracking-tighter" v-text="$i18n.t('tasks.title')" />
      <div class="flex-grow" />
      <button v-show="!$store.getters['schedule/isRunning']" :class="['px-2 py-1 text-xs rounded-lg border border-yellow-300 dark:border-opacity-50 dark:text-yellow-100 text-yellow-800 transition-colors', { 'bg-yellow-200 dark:bg-opacity-40': manageMode, 'bg-yellow-50 dark:bg-opacity-10': !manageMode }]" @click="manageMode = !manageMode">
        <IconManage class="inline translate-y-[-0.1rem]" size="16" />
        <span v-text="$i18n.t('tasks.manage')" />
      </button>
    </div>
    <div v-show="displayedTasks.length < 1" key="notask" class="italic text-black dark:text-gray-200 text-opacity-70 mt-3" v-text="$i18n.t('tasks.empty')" />
    <transition-group
      tag="div"
      name="transition-item"
      class="flex flex-col space-y-2 mt-2 py-1 -mx-2 px-2 max-h-64 overflow-y-auto overflow-x-hidden"
      @drop.prevent="itemDropped($event, 1)"
    >
      <TaskItem
        v-for="task in displayedTasks"
        :key="task.section + '-' + task.title"
        :manage="!$store.getters['schedule/isRunning'] && manageMode"
        :item="task"
        :droptarget="task === dropTarget"
        @input="$store.commit('tasklist/toggleComplete', { item: task })"
        @delete="$store.commit('tasklist/delete', { item: task })"
        @dropstart="draggedItem = task, dragging = true"
        @dropfinish="handleDrop"
        @droptarget="updateDropTarget"
      />
    </transition-group>
    <TaskAdd class="mt-3" />
  </div>
</template>

<script>
import { EditIcon } from 'vue-tabler-icons'
import TaskItem from '@/components/todoList/item.vue'
import TaskAdd from '@/components/todoList/addTask.vue'

export default {
  components: { TaskItem, TaskAdd, IconManage: EditIcon },
  data () {
    return {
      manageMode: false,

      /** Is a task being dragged to another place? */
      dragging: false,
      /** The task that is being moved */
      draggedItem: null,
      /** The task that the moved item will be dropped onto */
      dropTarget: null
    }
  },
  computed: {
    displayedTasks: {
      get () {
        let tasks = this.$store.getters['tasklist/sortedTasks']

        // only return tasks from the current section type if the timer is running
        if (this.$store.getters['schedule/isRunning']) {
          tasks = tasks
            .filter(task => task.section === this.$store.getters['schedule/getCurrentItem'].type)

          // only show first few tasks in this section (according to settings)
          if (this.$store.state.settings.tasks.maxActiveTasks > 0) {
            tasks = tasks.slice(0, this.$store.state.settings.tasks.maxActiveTasks)
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
      const newIndex = this.$store.state.tasklist.tasks.indexOf(this.dropTarget)
      this.$store.commit('tasklist/moveItem', { item: this.draggedItem, newIndex })

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
