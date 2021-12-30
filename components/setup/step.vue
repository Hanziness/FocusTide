<template>
  <div :class="['p-4', { 'bg-yellow-100 dark:bg-opacity-30': attention }]">
    <div :class="['flex flex-row items-center mb-4', { 'text-gray-800 dark:text-gray-100': !attention, 'text-amber-500 dark:text-yellow-300': attention }]">
      <IconAlert v-show="attention" class="mr-1" />
      <span class="text-2xl tracking-tight font-bold uppercase" v-text="title" />
    </div>
    <div v-show="description !== null" class="text-black dark:text-gray-100 text-opacity-90 -mt-4 mb-3" v-text="description" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
import { BellRingingIcon } from 'vue-tabler-icons'

export default {
  components: {
    IconAlert: BellRingingIcon
  },

  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    attention: {
      type: Boolean,
      default: false
    }
  }
}
</script>
