<template>
  <div class="px-4 py-3 rounded-xl bg-gray-50 shadow-lg border border-gray-400 border-opacity-20 w-96" @keyup.stop="">
    <div class="flex flex-row items-center">
      <p class="uppercase text-xl text-gray-800 font-bold tracking-tighter">
        Tasks
      </p>
      <div class="flex-grow" />
      <button v-show="!$store.getters['schedule/isRunning']" :class="['px-2 py-1 text-xs rounded-lg border border-yellow-300 bg-yellow-100 text-yellow-800 transition-colors', { 'bg-yellow-200': manageMode }]" @click="manageMode = !manageMode">
        Manage
      </button>
    </div>
    <div v-show="displayedTasks.length < 1" key="notask" class="italic text-black text-opacity-70 mt-3">
      <p>No tasks yet</p>
    </div>
    <transition-group
      tag="div"
      name="transition-item"
      class="flex flex-col space-y-2 mt-3"
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
import TaskItem from '@/components/todoList/item.vue'
import TaskAdd from '@/components/todoList/addTask.vue'

export default {
  components: { TaskItem, TaskAdd },
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
          tasks = tasks.filter(task => task.section === this.$store.getters['schedule/getCurrentItem'].type)
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
