
<script>
import { UserEventType } from '@/store/events'

const timerMode = {
  NULL: 0,
  WORK: 1,
  SHORTPAUSE: 2,
  LONGPAUSE: 3
}

const timerState = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
  COMPLETED: 3
}

const functionUpdateGroup = {
  TICK: 0,
  COMPLETE: 1
}

export default {
  props: {
    timerOriginal: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      timerRemaining: this.timerOriginal,
      lastUpdate: new Date().getTime(),
      nextTickDelta: 1000,
      timerHandle: null,
      timerState: timerState.STOPPED,

      // notify groups
      tickFunctions: {},
      completeFunctions: {},

      mode: timerMode.NULL
    }
  },

  watch: {
    timerOriginal (newValue, oldValue) {
      console.log(`Changed: ${oldValue} -> ${newValue}`)
      if (newValue !== oldValue && this.timerState === timerState.STOPPED) {
        this.$store.commit('timer/setTimes', newValue)
        this.resetTimer()
      }
    },

    timerState (newValue, oldValue) {
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
      this.timerRemaining = this.timerOriginal
    },

    /** Useful when dayjs locale has changed (forces an update on the timer) */
    refreshTime () {
      this.timerRemaining -= 1
      this.timerRemaining += 1
    },

    /** Clears the tick handle and stops ticking */
    clearTickHandle () {
      clearTimeout(this.timerHandle)
      this.timerHandle = null
    },

    /** Resets the remaining and original times to the new value */
    setTimes (newTimeInMs) {
      this.timerRemaining = newTimeInMs
      // this.timerOriginal = newTimeInMs
    },

    /** Changes `nextTickDelta` to the new value */
    changeTickDelta (newTickMs) {
      this.nextTickDelta = Math.max(50, newTickMs)
    },

    /** Subscribes `fn` function with ID `id` for a notification group. */
    subscribeToNotify ({ fn, id, functionGroup = functionUpdateGroup.TICK, enabled = true }) {
      switch (functionGroup) {
        case functionUpdateGroup.TICK:
          if (!this.tickFunctions[id]) { this.tickFunctions[id] = { enabled, fn } }
          break
        case functionUpdateGroup.COMPLETE:
          if (!this.completeFunctions[id]) { this.completeFunctions[id] = { enabled, fn } }
          break
      }
    },

    scheduleNextTick ({ decrement = true }) {
      this.timerTick({ decrement })

      if (this.timerState === timerState.RUNNING) {
        // check adaptive ticking settings
        let nextTickMs = this.$store.getters['settings/getAdaptiveTickRate']

        // schedule next tick
        if (Math.abs(nextTickMs - this.nextTickDelta) > 50) {
          this.changeTickDelta({ newTickDelta: nextTickMs })
        }

        nextTickMs = Math.min(nextTickMs, this.timerRemaining)
        const timeoutHandle = setTimeout(
          () => { this.scheduleNextTick() },
          nextTickMs
        )

        if (this.timerHandle) {
          this.clearTickHandle()
        }
        this.setTimerHandle(timeoutHandle)
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
          this.timerRemaining = Math.max(this.timerRemaining - elapsedDelta, 0)
        }
        this.lastUpdate = newUpdate
      }

      // check if timer completed and schedule next tick
      if (this.timerRemaining <= 0) {
      // timer completed, notify participants
        this.timerState = timerState.COMPLETED
        this.$emit('complete')
        // notifyFunctions(this, { group: functionUpdateGroup.COMPLETE, elapsedDelta })
      } else if (nextState === timerState.RUNNING) {
        // next tick is scheduled in the action
      } else {
        // do not tick further
        this.timerState = nextState
      }

      // execute subscribed update functions
      if (decrement) {
        // notifyFunctions(state, { group: functionUpdateGroup.TICK, elapsedDelta })
      }

      this.$emit('tick', this.timerRemaining)
    },

    /** Starts or resumes the timer */
    startTimer () {
      if (this.timerState === timerState.RUNNING) {
        // timer is set to be running, don't do anything
        return
      }

      if (this.timerState === timerState.PAUSED) {
        // do not touch remaining time
      } else if (this.timerState === timerState.STOPPED || this.timerState === timerState.COMPLETED) {
        this.resetTimer()
      }

      this.setTimerState(timerState.RUNNING)
      // commit('timerTick', { decrement: false }) // just update the tick timestamp
      this.scheduleNextTick({ decrement: false })
      this.$store.dispatch('events/recordUserEvent', UserEventType.TIMER_START, { root: true })
    },

    pauseOrStopTimer (stop = false) {
      // if the timer is not running OR it's not (paused and we want to stop it), we shouldn't do anything
      if (this.timerState !== timerState.RUNNING && !(this.timerState === timerState.PAUSED && stop)) {
        return
      }

      this.clearTickHandle()
      this.timerTick({ nextState: stop ? timerState.STOPPED : timerState.PAUSED })

      if (stop) {
        this.resetTimer()
        this.$store.dispatch('events/recordUserEvent', UserEventType.TIMER_STOP, { root: true })
      } else {
        this.$store.dispatch('events/recordUserEvent', UserEventType.TIMER_PAUSE, { root: true })
      }
    },

    /** Stops and resets the timer with a new value */
    setNewTimer ({ commit, dispatch }, newTimerMs) {
      dispatch('pauseOrStopTimer', true)
      commit('setTimes', newTimerMs)
    },

    /** Automatically resets the timer from the schedule */
    getTimerFromSchedule ({ rootState, dispatch, rootGetters }) {
      dispatch('setNewTimer', rootGetters['events/getSchedule'][0]._length)
    },

    setTimerState (newState) {
      this.timerState = newState
    }
  },

  render () {
    return this.$scopedSlots.default({
      timerRemaining: this.timerRemaining,
      timerOriginal: this.timerOriginal,
      timerState: this.timerState,
      fn_changeTimerState: this.setTimerState
    })
  }
}
</script>
