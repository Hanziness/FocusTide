<template>
  <div :class="['bg-gray-100 hover:bg-gray-200 hover:shadow-sm rounded-md border-l-8 themed-border px-2 py-2 transition-all duration-200 flex flex-row items-center', { 'opacity-50 line-through italic': item.state === 2 }]" :style="{ '--theme': $store.state.settings.visuals[item.section].colour }">
    <div class="flex flex-col">
      <span>{{ item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>
    <span class="flex-grow" />
    <transition name="slidein">
      <button v-show="manage" class="transition-all duration-100" @click="$emit('delete')">
        <IconDelete :size="18" />
      </button>
    </transition>
    <span><input :checked="checked" type="checkbox" class="rounded w-5 h-5 mr-1 themed-checkbox" @input="checked = !checked"></span>
  </div>
</template>

<script>
import IconDelete from 'vue-material-design-icons/TrashCan.vue'
import { taskState } from '@/store/tasklist'

export default {
  components: { IconDelete },
  props: {
    item: {
      type: Object,
      required: true
    },
    manage: {
      type: Boolean,
      default: false
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

.slidein-enter,
.slidein-leave-to {
  @apply opacity-0 translate-x-1;
}
</style>
