<template>
  <!-- @keyup.stop="" prevents `space` triggering a timer start/pause -->
  <div class="tasks-window" @keyup.stop="">
    <div class="header">
      <span v-text="$i18n.t('tasks.title')" />
      <div class="float-right flex flex-row justify-center ml-2">
        <div :class="['header-toggle', { 'active': controls.showAddControls && editing, 'disabled': !editing }]" @click="controls.showAddControls = !controls.showAddControls">
          <icon-add :size="20" title="" />
        </div>
        <div :class="['header-toggle', { 'active': !controls.open }]" @click="controls.open = !controls.open">
          <icon-minimize :size="20" title="" />
        </div>
      </div>
    </div>

    <!-- List -->
    <transition-group v-show="controls.open" name="tasklist-transition" tag="div" class="list">
      <div v-for="item in tasksToShow" :key="item.title" :class="['list-item', { 'complete': item.state === 2 }]">
        <div class="status">
          <task-status
            :status="item.state"
            :section="item.section"
            @click="$store.state.schedule.timerState !== 0 ? toggleComplete(item) : toggleWorking(item)"
          />
        </div>

        <div class="body">
          <div class="title" v-text="item.title" />
          <div class="description" v-text="item.description" />
        </div>

        <transition-group name="tasklist-transition" tag="div" class="tail">
          <div v-if="item.state !== 1" key="tail-delete" class="cursor-pointer" @click="deleteTask(item)">
            <icon-delete title="" />
          </div>
          <span key="tail-priority" class="priority" v-text="item.priority" />
          <div v-if="editing" key="tail-up" :class="['priority-change-button', { 'disabled': item.priority > 4 }]">
            <icon-up title="" @click="$store.commit('tasklist/changePriority', { item, direction: 1 })" />
          </div>
          <div v-if="editing" key="tail-down" :class="['priority-change-button', { 'disabled': item.priority < -4 }]">
            <icon-down title="" @click="$store.commit('tasklist/changePriority', { item, direction: -1 })" />
          </div>
        </transition-group>
      </div>
    </transition-group>

    <!-- Footer -->
    <div v-if="editing && controls.open && controls.showAddControls" class="footer">
      <div class="input">
        <input v-model="newTask.title" type="text" class="input-title" :placeholder="$i18n.t('tasks.form.title')">
        <input v-model="newTask.description" type="text" class="input-desc" :placeholder="$i18n.t('tasks.form.description')">
        <select v-model="newTask.section" class="input-section text-white text-sm py-1 bg-transparent">
          <option value="work" v-text="$i18n.t('section.work')" />
          <option value="shortpause" v-text="$i18n.t('section.shortpause')" />
          <option value="longpause" v-text="$i18n.t('section.longpause')" />
        </select>
      </div>
      <div
        :class="['add-button', { 'disabled': addButtonDisabled }]"
        :aria-disabled="addButtonDisabled"
        @click="addTask"
      >
        <icon-add title="" />
      </div>
    </div>
  </div>
</template>

<script>
import TaskStatus from '@/components/taskList/tasks/status.vue'
import IconUp from 'vue-material-design-icons/ChevronUp.vue'
import IconDown from 'vue-material-design-icons/ChevronDown.vue'
import IconDelete from 'vue-material-design-icons/Delete.vue'
import IconAdd from 'vue-material-design-icons/Plus.vue'
import IconMinimize from 'vue-material-design-icons/ArrowCollapse.vue'

import { taskState } from '@/store/tasklist'

export default {
  components: { TaskStatus, IconUp, IconDown, IconDelete, IconAdd, IconMinimize },
  props: {
    editing: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      newTask: {
        title: '',
        description: '',
        section: 'work'
      },
      controls: {
        open: true,
        showAddControls: true
      }
    }
  },

  computed: {
    tasksToShow () {
      const currentSectionType = this.$store.getters['schedule/getCurrentItem'].type
      const isTimerRunning = this.$store.state.schedule.timerState !== 0

      // show top n tasks
      if (isTimerRunning) {
        // get only tasks that should be present in this section
        return this.$store.getters['tasklist/sortedTasks'].filter((item) => {
          return item.section === currentSectionType && item.state !== taskState.waiting
        }).slice(0, 3)
        // TODO make "3" configurable
      } else {
        return this.$store.getters['tasklist/sortedTasks']
      }
    },

    taskTitles () {
      return this.$store.state.tasklist.tasks.map(item => item.title)
    },

    addButtonDisabled () {
      return this.newTask.title.length < 1 || this.taskTitles.includes(this.newTask.title)
    }
  },

  methods: {
    addTask () {
      if (this.newTask.title.length < 1) { return }

      this.$store.commit('tasklist/newTask', {
        title: this.newTask.title,
        description: this.newTask.description.length > 0 ? this.newTask.description : null,
        section: this.newTask.section,
        state: 1
      })

      this.newTask.title = ''
      this.newTask.description = ''
    },

    toggleComplete (item) {
      this.$store.commit('tasklist/toggleComplete', { item })
    },

    toggleWorking (item) {
      this.$store.commit('tasklist/toggleWorking', { item })
    },

    deleteTask (item) {
      this.$store.commit('tasklist/delete', { item })
    }
  }
}
</script>

<style lang="scss" scoped>
div.tasks-window {
  @apply py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 shadow-xl absolute z-20 max-w-lg max-h-96 flex flex-col;
  // @apply dark:bg-gray-900 dark:text-white;

  & > .header {
    @apply uppercase font-bold text-lg pl-4 pr-2;

    .header-toggle {
      @apply rounded-full bg-gray-200 mr-1 p-1;

      &:last-child {
        @apply mr-0;
      }

      &.active {
        @apply bg-gray-700 text-white;
      }

      &.disabled {
        @apply opacity-40 pointer-events-none;
      }
    }
  }

  & > .list {
    @apply grid grid-flow-row divide-y divide-gray-300 overflow-y-scroll flex-shrink overflow-x-hidden;
    // @apply dark:divide-gray-500;

    & > .list-item {
      @apply flex flex-row items-center px-4 py-2; // h-11

      &.complete {
        @apply line-through;
      }

      &:first-child {
        @apply mt-2;
      }

      & > .status {
        @apply mr-2;
      }

      & > .body {
        @apply flex-grow;

        & > .title {
          @apply text-base overflow-ellipsis;
        }

        & > .description {
          @apply text-black text-opacity-80 text-sm overflow-ellipsis;
          // @apply dark:text-white;
        }
      }

      & > .tail {
        @apply ml-2 flex flex-row select-none;

        & > .priority {
          @apply text-black text-opacity-60 text-sm mr-2 w-4 text-right flex flex-col justify-center;
          // @apply dark:text-white;
        }

        & > .priority-change-button {
          @apply rounded-full bg-gray-700 bg-opacity-0 hover:bg-opacity-30;
          // @apply dark:bg-white;

          &.disabled {
            @apply pointer-events-none opacity-40;
          }
        }
      }
    }
  }

  & > .footer {
    @apply px-2 flex flex-row my-2 content-center;

    & > .input {
      @apply flex flex-col flex-grow;

      // all inputs
      & > input,
      & > select {
        @apply p-2 focus:ring-0 border-gray-200 bg-gray-200 text-gray-900 text-sm;
        // @apply dark:border-gray-800 dark:bg-gray-800 dark:text-white;

        &:first-child {
          @apply rounded-t-lg;
        }

        &:last-child {
          @apply rounded-b-lg;
        }

        &:focus {
          @apply bg-gray-100;
          // @apply dark:bg-gray-700;
        }
      }

      & > input.input-desc {
        @apply text-gray-900 text-opacity-80 text-xs;
        // @apply dark:text-white;
      }
    }

    & > .add-button {
      @apply bg-blue-900 hover:bg-blue-800 text-white rounded-lg p-2 ml-2 select-none flex flex-col justify-center;
      // @apply dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-black;

      &.disabled {
        @apply opacity-60 pointer-events-none;
      }
    }
  }

  .tasklist-transition-move {
    @apply transition-transform;
  }

  .tasklist-transition-enter-active,
  .tasklist-transition-leave-active {
    transition: opacity 75ms ease-out, transform 150ms ease-out;
  }

  .tasklist-transition-enter,
  .tasklist-transition-leave-to {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
