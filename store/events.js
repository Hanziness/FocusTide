import dayjs from 'dayjs'
import { timerState } from '@/store/timer'

export const state = () => ({
  eventList: [],
  schedule: [
    new ScheduleEntry(60000, 0, ScheduleItemType.WORK),
    new ScheduleEntry(60000, 0, ScheduleItemType.SHORTPAUSE)
  ],
  currentBlockIndex: 0,
  maxScheduleEntries: 5,
  scheduleIndexCounter: 0,
  statesCompleted: 0
})

export const ScheduleItemType = {
  WORK: 'work',
  SHORTPAUSE: 'shortpause',
  LONGPAUSE: 'longpause',
  WAIT: 'wait',
  OTHER: 'other'
}

export class ScheduleEntry {
  constructor (index) {
    this._remaining = -1
    this._index = index
    this._timerState = timerState.STOPPED
  }
}

export class UserEvent {
  constructor (timestamp = dayjs(), eventType = UserEventType.OTHER) {
    this._timestamp = timestamp
    this._eventType = eventType
  }
}

export const UserEventType = {
  FOCUS_GAIN: 'focus.gain',
  FOCUS_LOST: 'focus.lost',
  TIMER_START: 'timer.start',
  TIMER_PAUSE: 'timer.pause',
  TIMER_STOP: 'timer.stop',
  TIMER_FINISH: 'timer.complete',
  SCHEDULE_ADVANCE_MANUAL: 'schedule.advmanual',
  SCHEDULE_ADVANCE_AUTO: 'schedule.advauto',
  OTHER: 'other'
}

export const getters = {
  getSchedule (state, getters, rootState) {
    const numEntriesInABlock = 2 * (rootState.settings.schedule.longPauseInterval)
    const schedule = JSON.parse(JSON.stringify(state.schedule))
    const i = state.statesCompleted

    for (let j = 0; j < rootState.settings.schedule.numScheduleEntries; j++) {
      const index = (i + j) % numEntriesInABlock
      if (!schedule[j]) {
        schedule[j] = JSON.parse(JSON.stringify(new ScheduleEntry(i + j)))
      }
      const item = schedule[j]

      if (index === numEntriesInABlock - 1) {
        item._length = rootState.settings.schedule.lengths.longpause + 900
        item._type = ScheduleItemType.LONGPAUSE
      } else if (index % 2) {
        item._length = rootState.settings.schedule.lengths.shortpause + 900
        item._type = ScheduleItemType.SHORTPAUSE
      } else {
        item._length = rootState.settings.schedule.lengths.work + 900
        item._type = ScheduleItemType.WORK
      }
    }

    return schedule
  },

  nextScheduleColour (state, getters, rootState) {
    // const currentState = state.schedule[1] ? state.schedule[1]._type : null
    const currentState = getters.getSchedule[1]._type
    if (currentState) {
      return rootState.settings.visuals[currentState].colour
    } else {
      return ''
    }
  },

  currentScheduleEntry (state, getters) {
    // if (state.schedule.length > 0) {
    //   return state.schedule[0]
    // } else {
    //   return null
    // }
    return getters.getSchedule[0]
  },

  currentScheduleColour (state, getters, rootState) {
    // return rootState.settings.visuals[state.schedule[0] ? state.schedule[0]._type : 'wait'].colour
    return rootState.settings.visuals[getters.getSchedule[0]._type].colour
  }
}

export const mutations = {
  initSchedule (state, newSchedule) {
    state.schedule = newSchedule
  },

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
    state.statesCompleted++
  },

  recordUserEvent (state, eventType = UserEventType.OTHER) {
    state.eventList.push(new UserEvent(dayjs(), eventType))
  }
}

export const actions = {
  initSchedule ({ state, commit, rootState }) {
    const numEntriesInABlock = 2 * (rootState.settings.schedule.longPauseInterval)
    const schedule = []
    let i = state.statesCompleted

    while (schedule.length < rootState.settings.schedule.numScheduleEntries) {
      const index = i % numEntriesInABlock
      if (index === numEntriesInABlock - 1) {
        schedule.push(new ScheduleEntry(rootState.settings.schedule.lengths.longpause + 900, i, ScheduleItemType.LONGPAUSE))
      } else if (index % 2) {
        schedule.push(new ScheduleEntry(rootState.settings.schedule.lengths.shortpause + 900, i, ScheduleItemType.SHORTPAUSE))
      } else {
        schedule.push(new ScheduleEntry(rootState.settings.schedule.lengths.work + 900, i, ScheduleItemType.WORK))
      }

      i++
    }

    commit('initSchedule', JSON.parse(JSON.stringify(schedule)))
  },

  checkSchedule ({ state, commit, rootState }) {
    const settingsToUse = rootState.settings.schedule
    while (state.schedule.length < state.maxScheduleEntries) {
      commit('insertNextScheduleEntry', settingsToUse)
    }
  },

  advanceSchedule ({ commit, dispatch, state, getters }, { isAutoAdvance = false }) {
    commit('completeScheduleEntry')
    // dispatch('checkSchedule')
    dispatch('timer/setNewTimer', getters.getSchedule[0]._length, { root: true })

    const loggedEventType = isAutoAdvance ? UserEventType.SCHEDULE_ADVANCE_AUTO : UserEventType.SCHEDULE_ADVANCE_MANUAL
    dispatch('recordUserEvent', loggedEventType)
  },

  recordUserEvent ({ rootState, commit }, eventType = UserEventType.OTHER) {
    if (rootState.settings.eventLoggingEnabled) {
      commit('recordUserEvent', eventType)
    }
  }
}
