import { defineStore } from 'pinia'

export const useEvents = defineStore('events', {
  state: () => ({
    events: [] as Event[],
    maxEventsToKeep: 200
  }),

  getters: {
    lastEvent: state => state.events.length > 0 ? state.events[state.events.length - 1] : null
  },

  actions: {
    recordEvent (eventType, eventData = undefined) {
      this.events.push(new Event(eventType, { data: eventData, timestamp: new Date() }))
      this.events.splice(0, this.events.length - this.maxEventsToKeep)
    }
  }
})

export enum EventType {
  FOCUS_GAIN = 'focus.gain',
  FOCUS_LOST = 'focus.lost',
  TIMER_START = 'timer.start',
  TIMER_PAUSE = 'timer.pause',
  TIMER_STOP = 'timer.stop',
  TIMER_FINISH = 'timer.complete',
  SCHEDULE_ADVANCE_MANUAL = 'schedule.adv.manual',
  SCHEDULE_ADVANCE_AUTO = 'schedule.adv.auto',
  APP_STARTED = 'app.start',
  APP_ERROR = 'app.error',
  NOTIFICATIONS_ENABLED = 'permission.notification',
  OTHER = 'other'
}

export class Event {
  _timestamp: Date
  _event: EventType

  /** Any additional payload for the event can be added here */
  _data?: unknown

  constructor (eventType = EventType.OTHER, { data = undefined, timestamp = new Date() }) {
    this._timestamp = timestamp
    this._event = eventType

    if (data !== undefined) {
      this._data = data
    }
  }
}
