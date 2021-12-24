<template>
  <div class="flex flex-row space-x-2 rounded-xl bg-gray-100 py-4 pl-4 pr-2 focus-within:bg-white focus-within:shadow-lg shadow-sm transition-all duration-500 focus-within:duration-200 items-center" :style="{ '--theme': $store.getters['schedule/currentScheduleColour'] }">
    <input v-model="taskTitle" type="text" required class="block min-w-0 bg-transparent border-none rounded-full focus:ring-transparent peer flex-grow p-0" @keyup="checkEnter">
    <button class="peer-invalid:bg-gray-200 peer-invalid:opacity-60 peer-invalid:pointer-events-none rounded-lg bg-theme bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-2 -my-3 transition-all" @click="addTask">
      <IconReturn />
    </button>
  </div>
</template>

<script>
import IconReturn from 'vue-material-design-icons/KeyboardReturn.vue'
import { taskState } from '@/store/tasklist.js'

export default {
  components: { IconReturn },
  data () {
    return {
      taskTitle: '',
      taskSection: 'work',
      taskState: taskState.inProgress
    }
  },
  methods: {
    addTask () {
      this.$store.commit('tasklist/newTask', { title: this.taskTitle, section: this.$store.getters['schedule/getCurrentItem'].type, state: this.taskState })
      this.taskTitle = ''
    },

    // Add new task when enter is pressed
    checkEnter (event) {
      if (event.code.toLowerCase() === 'enter') {
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
