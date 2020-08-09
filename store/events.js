export const state = () => ({
  eventList: [],
  schedule: [],
  currentBlockIndex: 0,
  maxScheduleEntries: 5,
  scheduleIndexCounter: 0
})

export const ScheduleItemType = {
  WORK: 'work',
  SHORTPAUSE: 'shortpause',
  LONGPAUSE: 'longpause',
  WAIT: 'wait',
  OTHER: 'other'
}

export class ScheduleEntry {
  constructor (length, index, type = ScheduleItemType.WORK) {
    this._type = type
    this._length = length
    this._index = index
  }
}

export const mutations = {
  insertNextScheduleEntry (state, { lengths, longPauseInterval }) {
    const numEntriesInABlock = 2 * (longPauseInterval)

    // we add 900 to the lengths to make sure the timer does not start by "subtracting 2 seconds"
    // at the very first tick: it's a bit more than 1000ms that gets subtracted

    if (state.currentBlockIndex === numEntriesInABlock - 1) {
      state.schedule.push(new ScheduleEntry(lengths.longpause + 900, state.scheduleIndexCounter++, ScheduleItemType.LONGPAUSE))
    } else if (state.currentBlockIndex % 2) {
      state.schedule.push(new ScheduleEntry(lengths.shortpause + 900, state.scheduleIndexCounter++, ScheduleItemType.SHORTPAUSE))
    } else {
      state.schedule.push(new ScheduleEntry(lengths.work + 900, state.scheduleIndexCounter++, ScheduleItemType.WORK))
    }
    state.currentBlockIndex = (state.currentBlockIndex + 1) % numEntriesInABlock
  },

  completeScheduleEntry (state) {
    state.schedule = state.schedule.slice(1)
  }
}

export const actions = {
  checkSchedule ({ state, commit, rootState }) {
    const settingsToUse = rootState.settings.schedule
    while (state.schedule.length < state.maxScheduleEntries) {
      commit('insertNextScheduleEntry', settingsToUse)
    }
  },

  advanceSchedule ({ commit, dispatch, state }) {
    commit('completeScheduleEntry')
    dispatch('checkSchedule')
    dispatch('timer/setNewTimer', state.schedule[0]._length, { root: true })
  }
}
