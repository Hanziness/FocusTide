<template>
  <div class="rounded-xl dark:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-600 focus-within:shadow-lg focus-within:duration-200 flex flex-row items-center py-4 pl-4 pr-2 space-x-2 transition-all duration-500 bg-gray-100 shadow-sm" :style="{ '--theme': currentScheduleColour }">
    <input
      ref="addtask_input"
      :value="taskTitle"
      type="text"
      required
      class="dark:bg-transparent focus:ring-transparent focus:ring-offset-0 dark:focus:bg-transparent peer flex-grow block min-w-0 p-0 bg-transparent border-none"
      :placeholder="$i18n.t('tasks.addPlaceholder')"
      @input="e => taskTitle = e.target.value"
      @keyup="checkEnter"
    >
    <button :class="['rounded-lg bg-theme bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-2 -my-3 transition-all', { 'bg-gray-200 opacity-60 dark:opacity-30 pointer-events-none': !valid }]" @click="addTask">
      <CornerDownLeftIcon size="24" />
    </button>
  </div>
</template>

<script>
import { CornerDownLeftIcon } from 'vue-tabler-icons'
import { mapActions, mapState } from 'pinia'
import { taskState, useTasklist } from '@/stores/tasklist.js'
import { useSchedule } from '~/stores/schedule'

export default {
  components: { CornerDownLeftIcon },

  data () {
    return {
      taskTitle: '',
      taskState: taskState.inProgress,
      valid: false,
      debug_lastinput: ''
    }
  },

  computed: {
    ...mapState(useTasklist, ['tasks']),
    ...mapState(useSchedule, ['getCurrentItem', 'currentScheduleColour'])
  },

  watch: {
    taskTitle (newValue) {
      if (newValue.length < 1) {
        this.valid = false
        return
      }

      const matchingTasks = this.tasks.filter(
        task => task.title === newValue && task.section === this.getCurrentItem.type
      )

      this.valid = matchingTasks.length === 0
    }
  },

  methods: {
    ...mapActions(useTasklist, ['newTask']),

    addTask () {
      this.newTask({ title: this.taskTitle, section: this.getCurrentItem.type, state: this.taskState })
      this.taskTitle = ''
      this.$refs.addtask_input.focus()
    },

    // Add new task when enter is pressed
    checkEnter (event) {
      if (this.valid && (event.code.toLowerCase() === 'enter' || event.keyCode === 13)) {
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
