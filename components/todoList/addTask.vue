<template>
  <div class="rounded-xl dark:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-600 focus-within:shadow-lg focus-within:duration-200 flex flex-row items-center py-4 pl-4 pr-2 space-x-2 transition-all duration-500 bg-gray-100 shadow-sm" :style="{ '--theme': $store.getters['schedule/currentScheduleColour'] }">
    <input
      v-model="taskTitle"
      type="text"
      required
      class="dark:bg-transparent focus:ring-transparent focus:ring-offset-0 dark:focus:bg-transparent peer flex-grow block min-w-0 p-0 bg-transparent border-none rounded-full"
      :placeholder="$i18n.t('tasks.addPlaceholder')"
      @keyup="checkEnter"
    >
    <button :class="['rounded-lg bg-theme bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-2 -my-3 transition-all', { 'bg-gray-200 opacity-60 dark:opacity-30 pointer-events-none': !valid }]" @click="addTask">
      <CornerDownLeftIcon size="24" />
    </button>
  </div>
</template>

<script>
import { CornerDownLeftIcon } from 'vue-tabler-icons'
import { taskState } from '@/store/tasklist.js'

export default {
  components: { CornerDownLeftIcon },

  data () {
    return {
      taskTitle: '',
      taskState: taskState.inProgress,
      valid: false
    }
  },

  watch: {
    taskTitle (newValue) {
      if (newValue.length < 1) {
        this.valid = false
        return
      }

      const matchingTasks = this.$store.state.tasklist.tasks.filter(
        task => task.title === newValue && task.section === this.$store.getters['schedule/getCurrentItem'].type
      )

      this.valid = matchingTasks.length === 0
    }
  },

  methods: {
    addTask () {
      this.$store.commit('tasklist/newTask', { title: this.taskTitle, section: this.$store.getters['schedule/getCurrentItem'].type, state: this.taskState })
      this.taskTitle = ''
    },

    // Add new task when enter is pressed
    checkEnter (event) {
      if (this.valid && event.code.toLowerCase() === 'enter') {
        this.addTask()
      }
    }
  }
}
</script>

<style lang="scss">
.bg-theme {
  background-color: var(--theme);
}
</style>
