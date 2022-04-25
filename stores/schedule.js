import { defineStore } from 'pinia'
import { useSettings } from './settings'

export const useSchedule = defineStore('schedule', {
  state: () => ({
    items: [],
    timerState: TIMERSTATE.STOPPED
  }),

  getters: {
    scheduleTypes: () => {
      const settings = useSettings()

      const numEntriesInABlock = 2 * (settings.schedule.longPauseInterval)
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
    getSchedule (state) {
      const settings = useSettings()
      const numEntities = settings.schedule.numScheduleEntries
      const scheduleTypes = this.scheduleTypes

      const returnArray = state.items.length === 0 ? [] : JSON.parse(JSON.stringify(state.items))

      // add or remove entries if needed
      if (numEntities < returnArray.length) {
        // remove last few entities
        returnArray.splice(numEntities, returnArray.length - numEntities)
      } else if (returnArray.length === 0) {
        returnArray.push(createScheduleEntry(0))
      } else if (numEntities > returnArray.length) {
        // add remaining entities
        for (let i = 0; i < numEntities - returnArray.length; i++) {
          returnArray.push(createScheduleEntry(returnArray[returnArray.length - 1].id + 1))
        }
      }

      for (let index = 0; index < returnArray.length; index++) {
        // set item type if needed
        const itemType = returnArray[index].type ? returnArray[index].type : scheduleTypes[returnArray[index].id % scheduleTypes.length]
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

    getCurrentItem () {
      return this.getSchedule[0]
    },

    getCurrentTimerState: (state) => {
      return state.timerState
    },

    isRunning: (state) => {
      return [TIMERSTATE.RUNNING, TIMERSTATE.PAUSED].includes(state.timerState)
    },

    // VISUALS
    currentScheduleColour: (state) => {
      const settings = useSettings()
      return settings.visuals[state.getCurrentItem.type].colour
    },

    nextScheduleColour: (state) => {
      const settings = useSettings()
      const nextState = state.getSchedule[1].type
      if (nextState) {
        return settings.visuals[nextState].colour
      } else {
        return 'transparent'
      }
    },

    getScheduleColour: (state) => {
      const settings = useSettings()
      const colours = []
      for (const item of state.getSchedule) {
        colours.push(settings.visuals[item.type].colour)
      }
      return colours
    }
  }
})

export const TIMERSTATE = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
  COMPLETED: 3
}

export const ScheduleItemType = {
  WORK: 'work',
  SHORTPAUSE: 'shortpause',
  LONGPAUSE: 'longpause',
  WAIT: 'wait',
  OTHER: 'other'
}

export const TimerState = {
  RESET: 0,
  TICKING: 1,
  PAUSED: 2,
  COMPLETED: 3
}

function createScheduleEntry (id) {
  return {
    id,
    timeElapsed: 0,
    length: undefined,
    type: undefined
  }
}
