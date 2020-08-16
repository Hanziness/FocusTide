export const AvailableTimers = {
  TIMER_TRADITIONAL: 'traditional',
  TIMER_APPROXIMATE: 'approximate'
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
    }
  },
  timerPresets: {
    default: {
      work: 25 * 60 * 1000, // 25 minutes
      shortpause: 5 * 60 * 1000, // 5 minutes
      longpause: 15 * 60 * 1000 // 15 minutes
    },
    debug: {
      work: 95 * 1000,
      shortpause: 8 * 1000,
      longpause: 12 * 1000
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
  eventLoggingEnabled: true,
  currentTimer: AvailableTimers.TIMER_APPROXIMATE
})

export const getters = {
  performanceSettings (state) {
    return state.performance
  }
}

export const mutations = {
  applyPreset (state, id) {
    if (state.timerPresets[id]) {
      state.schedule.lengths = state.timerPresets[id]
    }
  },

  changeClockStyle (state, newStyle) {
    if (Object.values(AvailableTimers).findIndex(newStyle) !== -1) {
      state.currentTimer = newStyle
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
