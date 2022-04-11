<template>
  <transition-group class="flex flex-col w-full max-w-sm gap-2 px-4" enter-class="translate-y-2 opacity-0" enter-active-class="transition" leave-to-class="-translate-y-2 opacity-0" leave-active-class="transition">
    <TaskItem
      v-for="task in tasks"
      :key="task.section + '-' + task.title"
      :manage="false"
      :draggable="false"
      :item="task"
      class="!border-l-0"
      @input="$store.commit('tasklist/toggleComplete', { item: task })"
      @delete="$store.commit('tasklist/delete', { item: task })"
    />
  </transition-group>
</template>

<script>
import Item from './item.vue'
export default {
  components: { TaskItem: Item },
  computed: {
    tasks: {
      get () {
        let tasks = this.$store.getters['tasklist/sortedTasks']
          .filter(task => task.section === this.$store.getters['schedule/getCurrentItem'].type)

        if (this.$store.state.settings.tasks.maxActiveTasks > 0) {
          tasks = tasks.slice(0, this.$store.state.settings.tasks.maxActiveTasks)
        }

        return tasks
      }
    }
  }
}
</script>
