import TickMultipliers from '@/assets/settings/adaptiveTickingMultipliers'

export const AvailableTimers = {
  TIMER_TRADITIONAL: 'traditional',
  TIMER_APPROXIMATE: 'approximate',
  TIMER_PERCENTAGE: 'percentage'
}

export const AvailableSoundSets = {
  SOUNDSET_MUSICAL: 'musical'
}

export const state = () => ({
  visuals: {
    work: {
      colour: 'rgb(255, 107, 107)'
    },
    shortpause: {
      colour: 'rgb(244, 162, 97)'
    },
    longpause: {
      colour: 'rgb(46, 196, 182)'
    },
    wait: {
      colour: 'rgb(222, 226, 230)'
    }
  },
  performance: {
    showProgressBar: true
  },
  schedule: {
    lengths: {
      work: 25 * 60 * 1000, // 25 minutes
      shortpause: 5 * 60 * 1000, // 5 minutes
      longpause: 15 * 60 * 1000 // 15 minutes
    },
    longPauseInterval: 3, // every 3rd pause is a long one,
    autoStartNextTimer: {
      wait: 8 * 1000,
      autostart: true
    },
    numScheduleEntries: 5,
    showSchedule: true
  },
  timerPresets: {
    default: {
      work: 25 * 60 * 1000, // 25 minutes
      shortpause: 5 * 60 * 1000, // 5 minutes
      longpause: 15 * 60 * 1000 // 15 minutes
    },
    debug: {
      work: 6 * 1000,
      shortpause: 5 * 1000,
      longpause: 4 * 1000
    }
  },
  globalPresets: {
    traditional: {
      nameId: 'traditional',
      tickRate: {
        normal: 1000,
        secondary: 60000
      },
      clockStyle: AvailableTimers.TIMER_TRADITIONAL,
      timerPreset: 'default'
    },
    modern: {
      nameId: 'modern',
      tickRate: {
        normal: 60000,
        secondary: 5 * 60000
      },
      clockStyle: AvailableTimers.TIMER_APPROXIMATE,
      timerPreset: 'default'
    }
  },
  eventLoggingEnabled: false,
  currentTimer: AvailableTimers.TIMER_APPROXIMATE,
  locale: null,
  adaptiveTicking: {
    enabled: true,
    baseTickRate: 1000,
    registeredHidden: null
  },
  permissions: {
    notifications: false,
    audio: true
  },
  audio: {
    volume: 0.9,
    repeatTimes: 2,
    soundSet: 'musical'
  }
})

export const getters = {
  isUserPresetActive (state) {
    return JSON.stringify(state.timerPresets.user) === JSON.stringify(state.schedule.lengths)
  },

  getActiveSchedulePreset (state) {
    for (const key in state.timerPresets) {
      if (JSON.stringify(state.timerPresets[key]) === JSON.stringify(state.schedule.lengths)) {
        return key
      }
    }

    return null
  },

  getAdaptiveTickRate (state) {
    if (state.adaptiveTicking.enabled && state.adaptiveTicking.registeredHidden !== null) {
      // fetch settings for the current timer style
      const timerSettings = TickMultipliers[state.currentTimer]
      const tickVersion = state.adaptiveTicking.registeredHidden ? 'hidden' : 'visible'

      // const tickBase = state.adaptiveTicking.registeredHidden ? state.adaptiveTicking.hiddenTickRate : state.adaptiveTicking.visibleTickRate
      const tickBase = state.adaptiveTicking.baseTickRate
      const tickMultiplier = (timerSettings && timerSettings[tickVersion]) ? timerSettings[tickVersion] : 1.0

      return tickBase * tickMultiplier
    }

    return state.adaptiveTicking.baseTickRate
  },

  performanceSettings (state) {
    return state.performance
  }
}

export const mutations = {
  registerNewHidden (state, newHidden = document.hidden) {
    state.adaptiveTicking.registeredHidden = newHidden
  },

  applyPreset (state, id) {
    if (state.timerPresets[id]) {
      state.schedule.lengths = Object.assign({}, state.timerPresets[id])
    }
  },

  changeClockStyle (state, newStyle) {
    if (Object.values(AvailableTimers).findIndex(newStyle) !== -1) {
      state.currentTimer = newStyle
    }
  },

  SET (state, { key, value, byRef = false }) {
    /*
     * example: key = ['a', 'b']
     * we find currentElement = state.settings.a, then set currentElement[b] = value
     * if we found state.settings.a.b at first, we couldn't change the value as
     * we wouldn't have a reference to the (primitive) a.b!
     */

    // find parent object
    let currentElement = state
    for (let index = 0; index < key.length - 1; index++) {
      currentElement = currentElement[key[index]]
    }

    // set value
    if (typeof value === 'object' && value !== null && !byRef) {
      // this avoids assigning by reference
      currentElement[key[key.length - 1]] = Object.assign({}, value)
    } else {
      currentElement[key[key.length - 1]] = value
    }
  }
}

export const actions = {
  applyGlobalPreset ({ state, commit }, presetId) {
    let chosenPreset
    if (!(chosenPreset = state.globalPresets[presetId])) {
      // TODO Log a potential error: wrong preset ID
    }

    commit('timer/changeTickDelta', { newTickDelta: chosenPreset.tickRate.normal, immediate: true }, { root: true })
    commit('changeClockStyle', chosenPreset.clockStyle)
    commit('applyPreset', chosenPreset.timerPreset)
  }
}
