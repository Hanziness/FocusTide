export const ScheduleItemType = {
  WORK: 'work',
  SHORTPAUSE: 'shortpause',
  LONGPAUSE: 'longpause',
  WAIT: 'wait',
  OTHER: 'other'
}

function createScheduleEntry (id) {
  return {
    id,
    timerElapsed: 0,
    timerState: 0,
    length: undefined,
    type: undefined
  }
}

export const state = () => {
  return {
    items: []
  }
}

export const getters = {
  /** Getter to retrieve all schedule item types */
  scheduleTypes (state, getters, rootState) {
    const numEntriesInABlock = 2 * (rootState.settings.schedule.longPauseInterval)
    const scheduleTypes = []

    for (let index = 0; index < numEntriesInABlock; index++) {
      let newType = ScheduleItemType.WORK

      if (index === (numEntriesInABlock - 1)) {
        newType = ScheduleItemType.LONGPAUSE
      } else if (index % 2) {
        newType = ScheduleItemType.SHORTPAUSE
      }

      scheduleTypes.push(newType)
    }

    return scheduleTypes
  },

  /** Getter to retrieve schedule with all necessary information filled in */
  getSchedule (state, getters, rootState) {
    const numEntities = rootState.settings.schedule.numScheduleEntries
    const scheduleTypes = getters.scheduleTypes

    const returnArray = state.items.length === 0 ? [] : JSON.parse(JSON.stringify(state.items))

    // add or remove entries if needed
    if (numEntities < returnArray.length) {
      // remove last few entities
      returnArray.splice(numEntities, returnArray.length - numEntities)
    } else {
      // add remaining entities
      for (let i = 0; i < returnArray.length - numEntities; i++) {
        returnArray.push(createScheduleEntry(returnArray.lastItem.id + 1))
      }
    }

    for (let index = 0; index < returnArray.length; index++) {
      // set item type if needed
      const itemType = returnArray[index].type ? returnArray[index].type : scheduleTypes[returnArray[index].id % scheduleTypes.length]
      if (returnArray[index].type === undefined) { returnArray[index].type = itemType }

      // set length if needed
      if (returnArray[index].length === undefined || returnArray[index].timerState === 0) {
        returnArray[index].length = rootState.settings.schedule.lengths[itemType]
      }

      // set remaining timer field
      returnArray[index].timerRemaining = returnArray[index].length - returnArray[index].timerElapsed
    }

    return returnArray
  }
}

export const mutations = {
  /** Advances the schedule by removing the first item and adding a new one to the end */
  advance (state) {
    state.items = state.items.slice(1).push(createScheduleEntry(state.items.lastItem.id + 1))
  },

  /** Allows locking information on a schedule item (so the getter will not override it) */
  lockInfo (state, { index = 0, length = undefined, type = undefined }) {
    if (index <= state.items.length) {
      state.items[index].length = length
      state.items[index].type = type
    }
  },

  /** Updates elapsed time on the first schedule entry */
  updateTime (state, timeElapsed) {
    state.items[0].timeElapsed = timeElapsed
  },

  /** Mutation to generate an initial schedule state */
  initSchedule (state, numEntries) {
    const startIndex = state.items.length > 0 ? state.items.lastItem.id : 0

    state.items = []
    for (let i = 0; i < numEntries; i++) {
      state.items.push(createScheduleEntry(startIndex + i))
    }
  }
}
