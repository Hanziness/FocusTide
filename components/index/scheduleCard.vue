<template>
  <div
    class="flex flex-col justify-between h-full px-3 py-2 text-gray-100 transition-all duration-500 rounded-lg bg-slate-800 w-80"
  >
    <div>
      <div class="flex flex-row items-center text-xl font-bold uppercase">
        <div :class="['w-4 h-4 inline-block rounded-md mr-2', dotClass]" />
        <span v-text="title" />
      </div>
      <div class="mb-2 text-gray-100 text-opacity-90" v-text="description" />
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
