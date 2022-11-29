/**
 * Timer presets for quick setting of work, pause and long pause session lengths, and long pause intervals.
 * When updating these, make sure to also update their translations keys (`timerpreset`)
 */
export default {
  default: {
    lengths: {
      work: 25 * 60 * 1000, // 25 minutes
      shortpause: 5 * 60 * 1000, // 5 minutes
      longpause: 15 * 60 * 1000 // 15 minutes
    },
    longPauseInterval: 3 // every 3rd pause is a long one
  },
  easy: {
    lengths: {
      work: 15 * 60 * 1000, // 15 minutes
      shortpause: 5 * 60 * 1000, // 5 minutes
      longpause: 15 * 60 * 1000 // 15 minutes
    },
    longPauseInterval: 2 // every 2nd pause is a long one
  },
  advanced: {
    lengths: {
      work: 40 * 60 * 1000, // 40 minutes
      shortpause: 10 * 60 * 1000, // 10 minutes
      longpause: 30 * 60 * 1000 // 30 minutes
    },
    longPauseInterval: 3 // every 3rd pause is a long one
  },
  workaholic: {
    lengths: {
      work: 50 * 60 * 1000, // 50 minutes
      shortpause: 10 * 60 * 1000, // 5 minutes
      longpause: 30 * 60 * 1000 // 20 minutes
    },
    longPauseInterval: 3 // every 3rd pause is a long one
  }
}
