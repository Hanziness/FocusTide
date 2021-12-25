<template>
  <div
    :class="['bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 hover:shadow-sm rounded-md border-l-8 themed-border px-2 py-2 transition-all duration-200 flex flex-row items-center', { 'opacity-50 line-through italic': item.state === 2, 'cursor-move': showReorder, 'ring themed-ring': dragged || droptarget }]"
    :style="{ '--theme': $store.state.settings.visuals[item.section].colour }"
    draggable
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, item), $emit('dropstart', item)"
    @dragover.prevent
    @dragend="dragged = false, $emit('dropfinish', item)"
    @dragenter="$emit('droptarget', item)"
  >
    <div :class="['-ml-2 -my-2 mr-2 self-stretch themed-bg transition-all duration-75 text-white flex flex-row items-center', { 'w-0': !showReorder, 'w-6': showReorder }]">
      <span v-show="showReorder">
        <IconMenu size="16" />
      </span>
    </div>
    <div class="flex flex-col select-none">
      <span>{{ item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>
    <span class="flex-grow" />
    <transition name="slidein">
      <button v-show="manage" class="transition-all duration-100" @click="$emit('delete')">
        <IconDelete size="18" class="mr-1" />
      </button>
    </transition>
    <span><input :checked="checked" type="checkbox" class="rounded w-5 h-5 mr-1 themed-checkbox dark:bg-gray-300" @input="checked = !checked"></span>
  </div>
</template>

<script>
import { MenuIcon, EraserIcon } from 'vue-tabler-icons'
import { taskState } from '@/store/tasklist'

export default {
  components: { IconMenu: MenuIcon, IconDelete: EraserIcon },
  props: {
    item: {
      type: Object,
      required: true
    },
    manage: {
      type: Boolean,
      default: false
    },
    /** Whether a dragged item is over this one */
    droptarget: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hovering: false,
      dragged: false
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
    },
    showReorder: {
      get () {
        return this.hovering
      }
    }
  },
  methods: {
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('source.title', item.title)
      evt.dataTransfer.setData('source.section', item.section)
      this.dragged = true
    }
  }
}
</script>

<style lang="scss">
.themed-border {
  border-color: var(--theme);
}

.themed-bg {
  background-color: var(--theme);
}

.themed-checkbox {
  color: var(--theme) !important;

  &:focus {
    --tw-ring-color: var(--theme);
  }

  .dark &:checked {
    background-color: var(--theme);
  }
}

.themed-ring {
  --tw-ring-color: var(--theme);
}

.slidein-enter,
.slidein-leave-to {
  @apply opacity-0 translate-x-1;
}
</style>
