const demoData = [
  { title: 'Release AnotherPomodoro', priority: 1, section: 'work', state: 1, keepOnScreen: false },
  { title: 'Finish the TODO part', description: '... and make it quick!', priority: 1, section: 'work', state: 1, keepOnScreen: false },
  { title: 'Listen to Margarita', priority: 2, section: 'work', state: 0, keepOnScreen: false },
  { title: 'Not relevant task', priority: -1, section: 'work', state: 0, keepOnScreen: false },
  { title: 'Do a backflip', priority: 2, section: 'shortpause', state: 2, keepOnScreen: false },
  { title: 'Push-ups haha', priority: 1, section: 'shortpause', state: 1, keepOnScreen: false }
]

export const taskState = {
  waiting: 0,
  inProgress: 1,
  complete: 2
}

export const state = () => ({
  tasks: [...demoData]
})

export const getters = {
  getRelevantTasks (state, getters, rootState, rootGetters) {
    const currentSectionType = rootGetters['schedule/getCurrentItem'].type
    const isTimerRunning = [1, 2, 3].includes(rootState.schedule.timerState)

    // show top n tasks
    if (isTimerRunning) {
      // get only tasks that should be present in this section
      return getters.sortedTasks.filter((item) => {
        return item.section === currentSectionType && item.state !== taskState.waiting
      }).slice(0, 3)
      // TODO make "3" configurable
    } else {
      return getters.sortedTasks
    }
  },

  /** Returns a sorted version of the tasks array where higher priorities go before lower priorities */
  sortedTasks (state) {
    // return a sorted copy (`sort` sorts in place)
    return [...state.tasks].sort((a, b) => {
      return b.priority - a.priority
    })
  }
}

export const mutations = {
  newTask (currentState, { title, description = null, priority = 0, section, state = taskState.waiting }) {
    const newTask = {
      title,
      description,
      priority,
      section,
      state,
      keepOnScreen: false
    }

    currentState.tasks.push(newTask)
  },

  changePriority (state, { item, direction }) {
    const itemIndex = state.tasks.indexOf(item)

    if (itemIndex < 0) { return }

    // change priority by +1 or -1 but keep it between -5 and +5
    state.tasks[itemIndex].priority = Math.min(5, Math.max(-5, state.tasks[itemIndex].priority + Math.sign(direction)))
  },

  // TODO COPY-PASTE WARNING
  toggleWorking (state, { item }) {
    const itemIndex = state.tasks.indexOf(item)
    if (itemIndex < 0) { return }

    state.tasks[itemIndex].state = state.tasks[itemIndex].state === taskState.inProgress ? taskState.waiting : taskState.inProgress
  },

  toggleComplete (state, { item }) {
    const itemIndex = state.tasks.indexOf(item)
    if (itemIndex < 0) { return }

    state.tasks[itemIndex].state = state.tasks[itemIndex].state === taskState.inProgress ? taskState.complete : taskState.inProgress
  },

  delete (state, { item }) {
    const itemIndex = state.tasks.indexOf(item)
    if (itemIndex < 0) { return }

    state.tasks.splice(itemIndex, 1)
  }
}
