import { defineStore } from 'pinia'

export const useEvents = defineStore('events', {
  state: () => ({
    events: [],
    maxEventsToKeep: 200
  }),

  actions: {
    recordEvent (eventType, eventData = undefined) {
      this.events.push(new Event(eventType, { data: eventData, timestamp: new Date() }))
      this.events.splice(0, this.events.length - this.maxEventsToKeep)
    }
  }
})

export const state = () => ({
  eventList: []
})

export class Event {
  constructor (eventType = EventType.OTHER, { data = undefined, timestamp = new Date() }) {
    this._timestamp = timestamp
    this._event = eventType

    if (data !== undefined) {
      this._data = data
    }
  }
}

export const EventType = {
  FOCUS_GAIN: 'focus.gain',
  FOCUS_LOST: 'focus.lost',
  TIMER_START: 'timer.start',
  TIMER_PAUSE: 'timer.pause',
  TIMER_STOP: 'timer.stop',
  TIMER_FINISH: 'timer.complete',
  SCHEDULE_ADVANCE_MANUAL: 'schedule.adv.manual',
  SCHEDULE_ADVANCE_AUTO: 'schedule.adv.auto',
  APP_STARTED: 'app.start',
  APP_ERROR: 'app.error',
  OTHER: 'other'
}
