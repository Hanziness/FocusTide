<script setup lang="ts">
import { IconCornerDownLeft } from '@tabler/icons-vue'
import { type Ref } from 'vue'
import { ButtonImportance } from '../base/types/button'
import Button from '~~/components/base/uiButton.vue'
import { TaskState, useTasklist } from '~~/stores/tasklist'
import { useSchedule } from '~~/stores/schedule'

const tasksStore = useTasklist()
const scheduleStore = useSchedule()
const addtaskInput: Ref<HTMLElement | null> = ref(null)

const data = reactive({
  taskTitle: '',
  taskState: TaskState.inProgress,
  valid: false,
  debug_lastinput: ''
})

// computed: {
//   ...mapState(useTasklist, ['tasks']),
//   ...mapState(useSchedule, ['getCurrentItem', 'currentScheduleColourModern'])
// },

watch(() => data.taskTitle, (newValue) => {
  if (newValue.length < 1) {
    data.valid = false
    return
  }

  const matchingTasks = tasksStore.tasks.filter(
    task => task.title === newValue && task.section === scheduleStore.getCurrentItem.type
  )

  data.valid = matchingTasks.length === 0
})

const addTask = () => {
  tasksStore.newTask(data.taskTitle, null, 0, scheduleStore.getCurrentItem.type, data.taskState)
  data.taskTitle = ''
  const addtaskInputCast = addtaskInput.value as HTMLElement

  addtaskInputCast.focus()
}

// Add new task when enter is pressed
const checkEnter = (event: KeyboardEvent) => {
  if (data.valid && (event.code.toLowerCase() === 'enter' || event.keyCode === 13)) {
    addTask()
  }
}
</script>

<template>
  <div class="flex flex-row items-center py-4 pl-4 pr-2 space-x-2 transition-all duration-500 shadow-sm bg-surface-light rounded-xl dark:bg-surface-dark focus-within:shadow-lg focus-within:ring-1 focus-within:ring-opacity-50 dark:focus-within:ring-opacity-50 focus-within:ring-primary dark:focus-within:ring-primary-dark focus-within:duration-200" :style="{ '--theme': scheduleStore.currentScheduleColourModern }">
    <input
      ref="addtaskInput"
      :value="data.taskTitle"
      type="text"
      required
      class="flex-grow block min-w-0 p-0 bg-transparent border-none dark:bg-transparent focus:ring-transparent focus:ring-offset-0 dark:focus:bg-transparent peer"
      :placeholder="$t('tasks.addPlaceholder')"
      @input="e => data.taskTitle = (e.target as HTMLInputElement)?.value"
      @keyup="checkEnter"
    >
    <Button
      :importance="ButtonImportance.Text"
      circle
      class="-my-2"
      :disabled="!data.valid"
      @click="addTask"
    >
      <IconCornerDownLeft :stroke-width="2" class="relative" size="24" />
    </Button>
  </div>
</template>
