<script setup lang="ts">
import { nextTick } from 'vue'
import { MenuIcon, TrashIcon, PencilIcon } from 'vue-tabler-icons'
import { taskState, useTasklist } from '~~/stores/tasklist'
import { useSettings, ColorMethod } from '~~/stores/settings'
import Button from '~/components/base/button.vue'

// declare refs
const editbox = ref(null)

const tasksStore = useTasklist()
const settingsStore = useSettings()

const props = defineProps({
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
})

const state = reactive({
  hovering: false,
  dragged: false,
  editing: false,
  editedTitle: null
})

const emit = defineEmits<{(event: 'input', checked: boolean) : void,
  (event: 'update', newTitle: string) : void,
  (event: 'delete') : void,
  (event: 'dropstart', item: unknown) : void,
  (event: 'dropfinish', item: unknown) : void,
  (event: 'droptarget', item: unknown) : void
}>()

const checked = computed({
  get () {
    return props.item.state === taskState.complete
  },
  set (newValue) {
    emit('input', newValue)
  }
})
const showReorder = computed(() => state.editing || (props.moveable && state.hovering))
const displayedTitle = computed({
  get () {
    return state.editedTitle ?? props.item.title
  },
  set (newValue: string) {
    state.editedTitle = newValue
  }
})
const isValid = computed(() => !tasksStore.tasks.some(task => task.id !== props.item.id && task.title === displayedTitle && task.section === props.item.section))

watch(() => state.editing, (newValue: boolean) => {
  if (newValue) {
    // only focus on <input> in the next tick (when it is rendered)
    nextTick(() => {
      editbox?.value.focus()
    })
  }
})

// methods
const startDrag = (evt, item) => {
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('source.title', item.title)
  evt.dataTransfer.setData('source.section', item.section)
  state.dragged = true
}

const handleEdit = (newValue) => {
  if (isValid && props.item.title !== displayedTitle) {
    emit('update', newValue)
  }
  state.editedTitle = null
}
</script>

<template>
  <div
    class="relative flex flex-row items-center px-2 py-3 transition-all duration-200 border-l-8 rounded-md hover:shadow-sm border-themed md:py-2"
    :class="[{ 'opacity-50 line-through italic': props.item.state === 2, 'cursor-move': props.showReorder, 'ring ring-themed': state.dragged || props.droptarget, 'bg-themed !text-white': props.manage && state.editing }, props.manage && state.editing ? 'bg-themed' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200']"
    :style="{ '--theme': settingsStore.getColor(props.item.section, ColorMethod.modern) }"
    draggable="true"
    @mouseenter="state.hovering = true"
    @mouseleave="state.hovering = false"
    @dragstart="(event) => { startDrag(event, item), emit('dropstart', props.item) }"
    @dragover.prevent
    @dragend="(event) => { state.dragged = false, emit('dropfinish', props.item) }"
    @dragenter="emit('droptarget', props.item)"
  >
    <div :class="['absolute left-0 top-0 h-full self-stretch bg-themed transition-all duration-75 text-white flex flex-row items-center flex-shrink-0 cursor-move', showReorder ? 'w-6' : 'w-0']">
      <span v-show="showReorder">
        <PencilIcon v-if="props.manage && state.editing" size="16" />
        <MenuIcon v-else size="16" />
      </span>
    </div>
    <div class="flex flex-col flex-grow w-full min-w-0 py-2 -my-2 transition-all duration-75 select-none mr-7" :class="[showReorder ? 'translate-x-6' : 'translate-x-0']" @click="state.editing = true">
      <input
        v-if="props.manage && state.editing"
        ref="editbox"
        v-model="displayedTitle"
        class="py-2 pl-1 -my-2 -ml-1 text-white bg-transparent outline-none"
        @blur="state.editing = false, handleEdit(displayedTitle)"
        @keyup.enter.exact="state.editing = false, handleEdit(displayedTitle)"
      >
      <span v-else class="break-words">{{ props.item.title }}</span>
      <!-- <span class="text-sm">Description</span> -->
    </div>

    <span class="flex-grow" />

    <div class="flex flex-row items-center flex-shrink-0 gap-4 md:gap-3">
      <transition name="slidein">
        <Button
          v-show="manage"
          circle
          :importance="3"
          class="-m-3 md:-m-2"
          inner-class="p-3 md:p-2"
          bg-class="ring-themed bg-themed"
          @click="emit('delete')"
        >
          <TrashIcon size="18" />
        </Button>
      </transition>
      <input v-model="checked" type="checkbox" class="w-6 h-6 mr-1 rounded text-themed dark:text-themed md:w-5 md:h-5">
    </div>
  </div>
</template>

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
