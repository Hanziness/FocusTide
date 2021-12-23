<template>
  <div class="bg-gray-100 hover:bg-gray-200 hover:shadow-sm rounded-md border-l-8 themed-border px-2 py-2 transition-all duration-100 flex flex-row items-center" :style="{ '--theme': 'red' }">
    <div class="flex flex-col">
      <span>{{ item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>
    <span class="flex-grow" />
    <span><input :checked="checked" type="checkbox" class="rounded w-5 h-5 mr-1 themed-checkbox" @input="checked = !checked"></span>
  </div>
</template>

<script>
import { taskState } from '@/store/tasklist'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    checked: {
      get () {
        return this.item.state === taskState.complete
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss">
.themed-border {
  border-color: var(--theme);
}

.themed-checkbox {
  color: var(--theme);

  &:focus {
    --tw-ring-color: var(--theme);
  }
}
</style>
