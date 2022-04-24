<template>
  <div
    :class="['relative bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 hover:shadow-sm rounded-md border-l-8 themed-border px-2 py-3 md:py-2 transition-all duration-200 flex flex-row items-center', { 'opacity-50 line-through italic': item.state === 2, 'cursor-move': showReorder, 'ring themed-ring': dragged || droptarget }]"
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
        class="break-words bg-transparent"
        @blur="editing = false, handleEdit(displayedTitle)"
      >
      <span v-else class="break-words">{{ item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>

    <span class="flex-grow" />

    <div class="flex flex-row items-center flex-shrink-0 space-x-1">
      <transition name="slidein">
        <button v-show="manage" class="transition-all duration-100" @click="$emit('delete')">
          <IconDelete size="18" class="mr-1" />
        </button>
      </transition>
      <input :checked="checked" type="checkbox" class="themed-checkbox md:w-5 md:h-5 w-6 h-6 mr-1 rounded" @input="checked = !checked">
    </div>
  </div>
</template>

<script>
import { MenuIcon, EraserIcon, PencilIcon } from 'vue-tabler-icons'
import { taskState } from '@/store/tasklist'

export default {
  components: { IconMenu: MenuIcon, IconDelete: EraserIcon, IconEditing: PencilIcon },
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
      editing: true,
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
        return this.moveable && this.hovering
      }
    },
    valid: {
      get () {
        return !this.$store.state.tasklist.tasks.some(task => task.id !== this.item.id && task.title === this.item.title && task.section === this.item.section)
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
        this.$nextTick(() => {
          console.log(`Editing -> focus on ${this.$refs.editbox}`)
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
      if (this.valid) {
        console.log(`Updated task to ${newValue}`)
        this.$emit('update', newValue)
      }
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
