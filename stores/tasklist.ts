import { defineStore } from 'pinia'
import { Section } from './settings'

export enum TaskState {
  waiting = 0,
  inProgress = 1,
  complete = 2
}
export interface Task {
  title: string,
  description: string | null,
  priority: number,
  section: Section,
  state: TaskState,
  keepOnScreen: boolean,
  id: number
}

export enum TaskMoveDirection {
  up = 1,
  down = -1
}

export const useTasklist = defineStore('tasklist', {
  state: () => ({
    tasks: [] as Task[]
  }),

  getters: {
    /** Returns a sorted version of the tasks array where higher priorities go before lower priorities */
    sortedTasks: (state): Task[] => {
    // return a sorted copy (`sort` sorts in place)
      return [...state.tasks].sort((a, b) => {
        return b.priority - a.priority
      })
    }
  },

  actions: {
    newTask (title: string, description: string | null, priority = 0, section: Section, state: TaskState = TaskState.waiting) {
      const newTask: Task = {
        title,
        description,
        priority,
        section,
        state,
        keepOnScreen: false,
        id: this.tasks.reduce((lastMax, currentItem) => Math.max(currentItem.id ?? 0, lastMax), -1) + 1
      }

      this.tasks.push(newTask)
    },

    changePriority (item: Task, direction: TaskMoveDirection) {
      const itemIndex = this.tasks.indexOf(item)

      if (itemIndex >= 0) {
        // change priority by +1 or -1 but keep it between -5 and +5
        this.tasks[itemIndex].priority = Math.min(5, Math.max(-5, this.tasks[itemIndex].priority + Math.sign(direction)))
      }
    },

    toggleWorking (item: Task) {
      const itemIndex = this.tasks.indexOf(item)
      if (itemIndex >= 0) {
        this.tasks[itemIndex].state = this.tasks[itemIndex].state === TaskState.inProgress ? TaskState.waiting : TaskState.inProgress
      }
    },

    setComplete (id: number, complete: boolean) {
      const itemIndex = this.tasks.findIndex(item => item.id === id)

      this.tasks[itemIndex].state = complete ? TaskState.complete : TaskState.inProgress
    },

    deleteTask (item: Task) {
      const itemIndex = this.tasks.indexOf(item)
      if (itemIndex >= 0) {
        this.tasks.splice(itemIndex, 1)
      }
    },

    removeCompleted () {
      this.tasks = this.tasks.filter(task => task.state !== TaskState.complete)
    },

    moveItem (item: Task, newIndex: number) {
      const oldIndex = this.tasks.indexOf(item)
      if (oldIndex < 0 || newIndex >= this.tasks.length) { return }

      this.tasks.splice(newIndex, 0, this.tasks.splice(oldIndex, 1)[0])
    },

    editTitle (id: number, newTitle: string) {
      const taskIndex = this.tasks.findIndex(item => item.id === id)

      if (taskIndex < 0) { return }

      this.tasks[taskIndex].title = newTitle
    }
  }
})
