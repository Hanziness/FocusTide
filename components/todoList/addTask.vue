<script setup lang="ts">
import { CornerDownLeftIcon } from 'vue-tabler-icons'
import { Ref } from 'vue'
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
  <div class="flex flex-row items-center py-4 pl-4 pr-2 space-x-2 transition-all duration-500 bg-gray-100 shadow-sm rounded-xl dark:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-600 focus-within:shadow-lg focus-within:duration-200" :style="{ '--theme': scheduleStore.currentScheduleColourModern }">
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
      :importance="3"
      circle
      class="-my-2 dark:!text-white"
      bg-class="bg-themed ring-themed dark:bg-slate-50 bg-slate-900"
      :disabled="!data.valid"
      @click="addTask"
    >
      <CornerDownLeftIcon :stroke-width="2" class="relative" size="24" />
    </Button>
  </div>
</template>
