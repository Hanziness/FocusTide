
<script>
const timerState = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
  COMPLETED: 3
}

export default {
  data () {
    return {
      // timeOriginal: 1,
      timeElapsed: 0,
      lastUpdate: new Date().getTime(),
      nextTickDelta: 1000,
      timerHandle: null
    }
  },

  computed: {
    timeOriginal () {
      return this.$store.getters['schedule/getCurrentItem'].length
    },

    timeRemaining () {
      return this.timeOriginal - this.timeElapsed
    },

    /** Allows detecting advances in schedule */
    scheduleId () {
      return this.$store.getters['schedule/getCurrentItem'].id
    },

    timerState: {
      get () {
        return this.$store.getters['schedule/getCurrentTimerState']
      },
      set (newValue) {
        this.$store.commit('schedule/updateTimerState', newValue)
      }
    }
  },

  watch: {
    /** Watcher to automatically reset timer if schedule changes */
    scheduleId (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.pauseOrStopTimer(true)
        this.resetTimer()
      }
    },

    /** Start/pause/stop timer if timerState changes */
    timerState (newValue, oldValue) {
      if (oldValue === timerState.COMPLETED) {
        this.resetTimer()
      }

      if (newValue !== oldValue) {
        switch (newValue) {
          case timerState.RUNNING:
            this.startTimer()
            break
          case timerState.STOPPED:
            this.pauseOrStopTimer(true)
            break
          case timerState.PAUSED:
            this.pauseOrStopTimer(false)
            break
          default:
            break
        }
      }
    }
  },

  methods: {
    /** Resets the remaining time to the original value, resetting the timer to 0% */
    resetTimer () {
      // this.timeRemaining = this.timerOriginal
      this.timeElapsed = 0
    },

    /** Useful when dayjs locale has changed (forces an update on the timer) */
    refreshTime () {
      this.timeElapsed -= 1
      this.timeElapsed += 1
    },

    /** Clears the tick handle and stops ticking */
    clearTickHandle () {
      clearTimeout(this.timerHandle)
      this.timerHandle = null
    },

    /** Changes `nextTickDelta` to the new value */
    changeTickDelta (newTickMs) {
      this.nextTickDelta = Math.max(50, newTickMs)
    },

    scheduleNextTick ({ decrement = true }) {
      this.timerTick({ decrement })

      if (this.timerState === timerState.RUNNING) {
        // check adaptive ticking settings
        let nextTickMs = this.$store.getters['settings/getAdaptiveTickRate']

        // schedule next tick
        if (Math.abs(nextTickMs - this.nextTickDelta) > 50) {
          this.nextTickDelta = nextTickMs
        }

        nextTickMs = Math.min(nextTickMs, this.timeRemaining)
        const timeoutHandle = setTimeout(
          () => {
            this.clearTickHandle()
            this.scheduleNextTick({})
          },
          nextTickMs
        )

        this.timerHandle = timeoutHandle
      }
    },

    /**
     * Adaptable tick function for handling the timer
     * @param {*} state The Vuex store state
     * @param {timerState} nextState The next state the timer will be in (if not RUNNING), it won't tick further
     * @param {boolean} decrement If set to false, the timer will tick this time, but won't affect the remaining time
     */
    timerTick ({ nextState = timerState.RUNNING, decrement = true }) {
      const newUpdate = new Date().getTime()
      const elapsedDelta = newUpdate - this.lastUpdate

      // update remaining time if the timer is still running
      if (this.timerState === timerState.RUNNING) {
        if (decrement) {
          // this.timeRemaining = Math.max(this.timeRemaining - elapsedDelta, 0)
          this.timeElapsed = Math.min(this.timeElapsed + elapsedDelta, this.timeOriginal)
        }

        this.lastUpdate = newUpdate
      }

      // check if timer completed and schedule next tick
      if (this.timeElapsed >= this.timeOriginal) {
      // timer completed, notify participants
        this.timerState = timerState.COMPLETED
        this.$emit('complete')
      } else if (nextState === timerState.RUNNING) {
        // next tick is scheduled
      } else {
        // do not tick further
        this.timerState = nextState
      }

      this.$emit('tick', this.timeElapsed)
      this.$store.commit('schedule/updateTime', this.timeElapsed)
    },

    /** Starts or resumes the timer */
    startTimer () {
      this.$store.commit('schedule/lockInfo', {
        length: this.timeOriginal,
        type: this.$store.getters['schedule/getCurrentItem'].type
      })
      this.scheduleNextTick({ decrement: false })
    },

    pauseOrStopTimer (stop = false) {
      this.clearTickHandle()
      this.timerTick({ nextState: stop ? timerState.STOPPED : timerState.PAUSED })

      if (stop) {
        // remove info lock on schedule entry
        this.$store.commit('schedule/lockInfo', {
          length: undefined,
          type: undefined
        })
        this.resetTimer()
      }
    },

    /** Stops and resets the timer with a new value */
    setNewTimer (newTimerMs) {
      this.pauseOrStopTimer(true)
      this.setTimes(newTimerMs)
    },

    /** Automatically resets the timer from the schedule */
    getTimerFromSchedule ({ rootState, dispatch, rootGetters }) {
      this.setNewTimer(rootGetters['events/getSchedule'][0]._length)
    }
  },

  render () {
    return this.$scopedSlots.default({
      timeRemaining: this.timeRemaining,
      timeElapsed: this.timeElapsed,
      timeOriginal: this.timeOriginal,
      timerState: this.timerState,
      fn_changeTimerState: this.setTimerState
    })
  }
}
</script>
