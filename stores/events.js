import { defineStore } from 'pinia'

export default defineStore('events', {
  state: () => ({
    eventList: []
  }),

  actions: {
    recordUserEvent (eventType) {
      this.eventList.push(new UserEvent(new Date(), eventType))
    }
  }
})

export const state = () => ({
  eventList: []
})

export class UserEvent {
  constructor (timestamp = new Date(), eventType = UserEventType.OTHER) {
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
