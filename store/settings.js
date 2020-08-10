export const AvailableTimers = {
  TIMER_TRADITIONAL: 'traditional',
  TIMER_APPROXIMATE: 'approximate'
}

export const state = () => ({
  visuals: {
    work: {
      colour: 'red lighten-2'
    },
    shortpause: {
      colour: 'orange lighten-1 '
    },
    longpause: {
      colour: 'green'
    },
    wait: {
      colour: 'purple lighten-2'
    }
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
  eventLoggingEnabled: true,
  currentTimer: AvailableTimers.TIMER_APPROXIMATE
})

export const mutations = {
  applyPreset (state, id) {
    if (state.timerPresets[id]) {
      state.schedule.lengths = state.timerPresets[id]
    }
  }
}
