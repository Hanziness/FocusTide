<template>
  <div
    class="hover:shadow-sm themed-border md:py-2 relative flex flex-row items-center px-2 py-3 transition-all duration-200 border-l-8 rounded-md"
    :class="[{ 'opacity-50 line-through italic': item.state === 2, 'cursor-move': showReorder, 'ring themed-ring': dragged || droptarget, 'themed-bg !text-white': manage && editing }, manage && editing ? 'themed-bg' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200']"
    :style="{ '--theme': $store.state.settings.visuals[item.section].colour }"
    draggable
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @dragstart="startDrag($event, item), $emit('dropstart', item)"
    @dragover.prevent
    @dragend="dragged = false, $emit('dropfinish', item)"
    @dragenter="$emit('droptarget', item)"
  >
    <div :class="['absolute left-0 top-0 h-full self-stretch themed-bg transition-all duration-75 text-white flex flex-row items-center flex-shrink-0', showReorder ? 'w-6' : 'w-0']">
      <span v-show="showReorder">
        <IconEditing v-if="manage && editing" size="16" />
        <IconMenu v-else size="16" />
      </span>
    </div>
    <div class="mr-7 flex flex-col flex-grow w-full min-w-0 py-2 -my-2 transition-all duration-75 select-none" :class="[showReorder ? 'translate-x-6' : 'translate-x-0']" @click="editing = true">
      <input
        v-if="manage && editing"
        ref="editbox"
        v-model="displayedTitle"
        class="py-2 pl-1 -my-2 -ml-1 text-white bg-transparent outline-none"
        @blur="editing = false, handleEdit(displayedTitle)"
        @keyup.enter.exact="editing = false, handleEdit(displayedTitle)"
      >
      <span v-else class="break-words">{{ item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>

    <span class="flex-grow" />

    <div class="md:gap-3 flex flex-row items-center flex-shrink-0 gap-4">
      <transition name="slidein">
        <button v-show="manage" class="hover:bg-slate-900 dark:hover:bg-slate-100 hover:bg-opacity-10 dark:hover:bg-opacity-20 md:p-2 md:-m-2 p-3 -m-3 transition-all duration-100 rounded-full" @click="$emit('delete')">
          <IconDelete size="18" />
        </button>
      </transition>
      <input :checked="checked" type="checkbox" class="themed-checkbox md:w-5 md:h-5 w-6 h-6 mr-1 rounded" @input="checked = !checked">
    </div>
  </div>
</template>

<script>
import { MenuIcon, TrashIcon, PencilIcon } from 'vue-tabler-icons'
import { taskState } from '@/store/tasklist'

export default {
  components: { IconMenu: MenuIcon, IconDelete: TrashIcon, IconEditing: PencilIcon },
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
    },
    moveable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hovering: false,
      dragged: false,
      editing: false,
      editedTitle: null
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
        return this.editing || (this.moveable && this.hovering)
      }
    },
    valid: {
      get () {
        return !this.$store.state.tasklist.tasks.some(task => task.id !== this.item.id && task.title === this.displayedTitle && task.section === this.item.section)
      }
    },
    displayedTitle: {
      get () {
        return this.editedTitle ?? this.item.title
      },
      set (newValue) {
        this.editedTitle = newValue
      }
    }
  },
  watch: {
    editing (newValue) {
      if (newValue) {
        // only focus on <input> in the next tick (when it is rendered)
        this.$nextTick(() => {
          this.$refs.editbox?.focus()
        })
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
    },

    handleEdit (newValue) {
      if (this.valid && this.item.title !== this.displayedTitle) {
        this.$emit('update', newValue)
      }
      this.editedTitle = null
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
