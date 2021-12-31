<template>
  <div class="transition-all duration-500 rounded-lg bg-slate-800 px-3 py-2 text-gray-100 w-80 h-full flex flex-col justify-between">
    <div>
      <div class="text-xl font-bold uppercase flex flex-row items-center">
        <div :class="['w-4 h-4 inline-block rounded-md mr-2', dotClass]" />
        <span v-text="title" />
      </div>
      <div class="text-gray-100 text-opacity-90 mb-2" v-text="description" />
    </div>
    <div class="font-bold" v-text="duration" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    },

    duration: {
      type: String,
      default: ''
    },

    dotClass: {
      type: String,
      default: ''
    }
  }
}
</script>
