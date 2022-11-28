import { defineStore } from 'pinia'
import { ColorMethod, Section, Settings, useSettings } from './settings'

export enum ETimerState {
  STOPPED,
  RUNNING,
  PAUSED,
  COMPLETED
}
export interface ScheduleEntry {
  id: number,
  timeElapsed: number,
  length?: number,
  type?: Section
}

export interface ScheduleEntryComplete {
  id: number,
  timeElapsed: number,
  length: number,
  type: Section
}

export enum ScheduleItemType {
  WORK = 'work',
  SHORTPAUSE = 'shortpause',
  LONGPAUSE = 'longpause',
  WAIT = 'wait',
  OTHER = 'other'
}

export enum TimerState {
  STOPPED,
  RUNNING,
  PAUSED,
  COMPLETED
}

export const useSchedule = defineStore('schedule', {
  state: () => ({
    items: createScheduleSeries(10),
    timerState: TimerState.STOPPED
  }),

  getters: {
    scheduleTypes: () => {
      const settings = useSettings()

      const numEntriesInABlock = 2 * (settings.schedule.longPauseInterval)
      const scheduleTypes: ScheduleItemType[] = []

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
    getSchedule (state): ScheduleEntryComplete[] {
      const settings = useSettings()
      const scheduleSettings = settings.schedule
      const numEntities = scheduleSettings.numScheduleEntries
      const scheduleTypes = this.scheduleTypes

      const returnArray = state.items.length === 0 ? [] : JSON.parse(JSON.stringify(state.items))

      // add or remove entries if needed
      if (numEntities < returnArray.length) {
        // remove last few entities
        returnArray.splice(numEntities, returnArray.length - numEntities)
      } else if (numEntities > returnArray.length) {
        // add remaining entities
        if (returnArray.length === 0) {
          returnArray.push(createScheduleEntry(0))
        }

        for (let i = 1; i < numEntities - returnArray.length; i++) {
          returnArray.push(createScheduleEntry(returnArray[returnArray.length - 1].id + 1))
        }
      }

      for (let index = 0; index < returnArray.length; index++) {
        // set item type if needed
        const itemType: keyof Settings['schedule']['lengths'] = returnArray[index].type ? returnArray[index].type : scheduleTypes[returnArray[index].id % scheduleTypes.length]
        if (returnArray[index].type === undefined) { returnArray[index].type = itemType }

        // set length if needed
        if (returnArray[index].length === undefined) {
          returnArray[index].length = settings.schedule.lengths[itemType]
        }

        // set remaining timer field
        returnArray[index].timeRemaining = returnArray[index].length - returnArray[index].timeElapsed
      }

      return returnArray
    },

    getCurrentItem (): ScheduleEntryComplete {
      return this.getSchedule[0]
    },

    getCurrentTimerState: (state) => {
      return state.timerState
    },

    isRunning: (state) => {
      return [TimerState.RUNNING, TimerState.PAUSED].includes(state.timerState)
    },

    // VISUALS
    currentScheduleColour (): string {
      const settings = useSettings()
      return settings.getColor(this.getCurrentItem.type)
    },

    currentScheduleColourModern (): string {
      const settings = useSettings()
      return settings.getColor(this.getCurrentItem.type, ColorMethod.modern)
    },

    nextScheduleColour (): string {
      const settings = useSettings()
      const nextState = this.getSchedule[1].type
      if (nextState) {
        return settings.getColor(nextState)
      } else {
        return 'transparent'
      }
    },

    getScheduleColour (): string[] {
      const settings = useSettings()
      const colours: string[] = []
      for (const item of this.getSchedule) {
        colours.push(settings.getColor(item.type))
      }
      return colours
    }
  },

  actions: {
    /** Advances the schedule by removing the first item and adding a new one to the end */
    advance () {
      this.items = this.items.slice(1)
      this.items.push(createScheduleEntry(this.items.length > 0 ? this.items.slice(-1)[0].id + 1 : 0))
    },

    /** Allows locking information on a schedule item (so the getter will not override it) */
    lockInfo ({ index = 0, length = undefined, type = undefined }) {
      if (index <= this.items.length) {
        this.items[index].length = length
        this.items[index].type = type
      }
    },

    /** Updates elapsed time on the first schedule entry */
    updateTime (timeElapsed: number) {
      this.items[0].timeElapsed = timeElapsed
    },

    updateTimerState (newState: TimerState) {
      this.timerState = newState
    },

    /** Mutation to generate an initial schedule state */
    initSchedule (numEntries: number) {
      this.items = createScheduleSeries(numEntries)
    }
  }
})

function createScheduleEntry (id: number): ScheduleEntry {
  return {
    id,
    timeElapsed: 0,
    length: undefined,
    type: undefined
  }
}

function createScheduleSeries (numEntries: number) {
  const items = [] as ScheduleEntry[]
  for (let i = 0; i < numEntries; i++) {
    items.push(createScheduleEntry(i))
  }

  return items
}
