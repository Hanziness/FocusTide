<template>
  <div class="px-4 py-3 rounded-xl bg-gray-50 shadow-lg border border-gray-400 border-opacity-20 w-96">
    <p class="uppercase text-xl text-gray-800 font-bold tracking-tighter">
      Tasks
    </p>
    <div class="flex flex-col space-y-2 mt-3">
      <TaskItem :item="{title: 'Task 1', state: 0}" />
      <TaskItem :item="{title: 'Task 2', state: 2}" />
    </div>
    <div class="mt-3 flex flex-row space-x-2 rounded-xl bg-gray-100 py-4 pl-4 pr-2 focus-within:bg-white focus-within:shadow-lg shadow-sm transition-all duration-500 focus-within:duration-200 items-center">
      <input type="text" required class="block min-w-0 bg-transparent border-none rounded-full focus:ring-transparent peer flex-grow p-0">
      <button class="peer-invalid:bg-gray-200 peer-invalid:opacity-60 peer-invalid:pointer-events-none rounded-lg bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white px-3 py-2 -my-3 transition-all">
        <IconReturn />
      </button>
    </div>
  </div>
</template>

<script>
import IconReturn from 'vue-material-design-icons/KeyboardReturn.vue'

import TaskItem from '@/components/todoList/item.vue'

export default {
  components: { IconReturn, TaskItem }
}
</script>
