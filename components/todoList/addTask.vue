<template>
  <div class="flex flex-row items-center py-4 pl-4 pr-2 space-x-2 transition-all duration-500 bg-gray-100 shadow-sm rounded-xl dark:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-600 focus-within:shadow-lg focus-within:duration-200" :style="{ '--theme': currentScheduleColourModern }">
    <input
      ref="addtask_input"
      :value="taskTitle"
      type="text"
      required
      class="flex-grow block min-w-0 p-0 bg-transparent border-none dark:bg-transparent focus:ring-transparent focus:ring-offset-0 dark:focus:bg-transparent peer"
      :placeholder="$t('tasks.addPlaceholder')"
      @input="e => taskTitle = e.target.value"
      @keyup="checkEnter"
    >
    <Button
      :importance="3"
      circle
      class="-my-2 dark:!text-white"
      bg-class="bg-themed ring-themed dark:bg-slate-50 bg-slate-900"
      :disabled="!valid"
      @click="addTask"
    >
      <CornerDownLeftIcon :stroke-width="2" class="relative" size="24" />
    </Button>
  </div>
</template>

<script>
import { CornerDownLeftIcon } from 'vue-tabler-icons'
import { mapActions, mapState } from 'pinia'
import Button from '@/components/base/button.vue'
import { taskState, useTasklist } from '~~/stores/tasklist'
import { useSchedule } from '~~/stores/schedule'

export default {
  components: { Button, CornerDownLeftIcon },

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
    ...mapState(useSchedule, ['getCurrentItem', 'currentScheduleColourModern'])
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
