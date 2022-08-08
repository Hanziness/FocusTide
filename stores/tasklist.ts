import { defineStore } from 'pinia'

export const useTasklist = defineStore('tasklist', {
  state: () => ({
    tasks: []
  }),

  getters: {
    /** Returns a sorted version of the tasks array where higher priorities go before lower priorities */
    sortedTasks: (state) => {
    // return a sorted copy (`sort` sorts in place)
      return [...state.tasks].sort((a, b) => {
        return b.priority - a.priority
      })
    }
  },

  actions: {
    newTask ({ title, description = null, priority = 0, section, state = taskState.waiting }) {
      const newTask = {
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

    changePriority ({ item, direction }) {
      const itemIndex = this.tasks.indexOf(item)

      if (itemIndex >= 0) {
        // change priority by +1 or -1 but keep it between -5 and +5
        this.tasks[itemIndex].priority = Math.min(5, Math.max(-5, this.tasks[itemIndex].priority + Math.sign(direction)))
      }
    },

    toggleWorking ({ item }) {
      const itemIndex = this.tasks.indexOf(item)
      if (itemIndex >= 0) {
        this.tasks[itemIndex].state = this.tasks[itemIndex].state === taskState.inProgress ? taskState.waiting : taskState.inProgress
      }
    },

    setComplete (id: string, complete: boolean) {
      const itemIndex = this.tasks.findIndex(item => item.id === id)

      this.tasks[itemIndex].state = complete ? taskState.complete : taskState.inProgress
    },

    deleteTask ({ item }) {
      const itemIndex = this.tasks.indexOf(item)
      if (itemIndex >= 0) {
        this.tasks.splice(itemIndex, 1)
      }
    },

    removeCompleted () {
      this.tasks = this.tasks.filter(task => task.state !== taskState.complete)
    },

    moveItem ({ item, newIndex }) {
      const oldIndex = this.tasks.indexOf(item)
      if (oldIndex < 0 || newIndex >= this.tasks.length) { return }

      this.tasks.splice(newIndex, 0, this.tasks.splice(oldIndex, 1)[0])
    },

    editTitle ({ id, newTitle }) {
      const taskIndex = this.tasks.findIndex(item => item.id === id)

      if (taskIndex < 0) { return }

      this.tasks[taskIndex].title = newTitle
    }
  }
})

export const taskState = {
  waiting: 0,
  inProgress: 1,
  complete: 2
}
