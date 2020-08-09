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
  }
})
