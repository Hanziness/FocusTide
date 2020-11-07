import dayjs from 'dayjs'

export const state = () => ({
  eventList: []
})

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

export const mutations = {
  recordUserEvent (state, eventType = UserEventType.OTHER) {
    state.eventList.push(new UserEvent(dayjs(), eventType))
  }
}

export const actions = {
  recordUserEvent ({ rootState, commit }, eventType = UserEventType.OTHER) {
    if (rootState.settings.eventLoggingEnabled) {
      commit('recordUserEvent', eventType)
    }
  }
}
