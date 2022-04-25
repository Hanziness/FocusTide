
<script>
import { mapStores, mapState, mapWritableState } from 'pinia'
import { TIMERSTATE, TimerState, useSchedule } from '@/stores/schedule'
import { useSettings } from '~/stores/settings'
import { useTasklist } from '~/stores/tasklist'

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
    ...mapState(useSchedule, {
      timeOriginal: store => store.getCurrentItem.length,
      scheduleId: store => store.getCurrentItem.id
    }),

    ...mapState(useSettings, {
      adaptiveTickRate: 'getAdaptiveTickRate'
    }),

    ...mapWritableState(useSchedule, ['timerState']),

    timeRemaining () {
      return this.timeOriginal - this.timeElapsed
    },

    ...mapStores(useSettings, useSchedule, useTasklist)
  },

  watch: {
    /** Watcher to automatically reset timer if schedule changes */
    scheduleId (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.resetTimer()

        if (this.settingsStore.tasks.removeCompletedTasks) {
          this.tasklistStore.removeCompleted()
        }
      }
    },

    adaptiveTickRate (newValue, oldValue) {
      if (this.timerState === TimerState.TICKING && newValue !== oldValue) {
        this.scheduleNextTick({})
      }
    },

    /** Start/pause/stop timer if timerState changes */
    timerState (newValue, oldValue) {
      if (oldValue === TimerState.COMPLETED) {
        this.resetTimer()
      }

      if (newValue !== oldValue) {
        switch (newValue) {
          case TimerState.TICKING:
            this.startTimer()
            break
          case TimerState.RESET:
            this.pauseOrStopTimer(true)
            break
          case TimerState.PAUSED:
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
      const currentTimerState = this.scheduleStore.getCurrentTimerState
      const nextState = currentTimerState === TIMERSTATE.RUNNING ? currentTimerState : TIMERSTATE.STOPPED
      this.timeElapsed = 0
      this.timerTick({ nextState, decrement: false })
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

      if (this.timerState === TimerState.TICKING) {
        // check adaptive ticking settings
        let nextTickMs = this.settingsStore.getAdaptiveTickRate

        // schedule next tick
        if (Math.abs(nextTickMs - this.nextTickDelta) > 50) {
          this.nextTickDelta = nextTickMs
        }

        // if there was a timer handle, clear it
        this.clearTickHandle()

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
    timerTick ({ nextState = TimerState.TICKING, decrement = true }) {
      const newUpdate = new Date().getTime()
      const elapsedDelta = newUpdate - this.lastUpdate

      // update remaining time if the timer is still running
      if (decrement) {
        // this.timeRemaining = Math.max(this.timeRemaining - elapsedDelta, 0)
        this.timeElapsed = Math.min(this.timeElapsed + elapsedDelta, this.timeOriginal)
      }

      this.lastUpdate = newUpdate

      // check if timer completed and schedule next tick
      if (nextState === TimerState.TICKING && this.timeElapsed >= this.timeOriginal) {
      // timer completed, notify participants
        this.timerState = TimerState.COMPLETED
        this.$emit('complete')
      } else if (nextState === TimerState.TICKING) {
        // next tick is scheduled
      } else {
        // do not tick further
        this.timerState = nextState
      }

      this.$emit('tick', this.timeElapsed)
    },

    /** Starts or resumes the timer */
    startTimer () {
      this.scheduleStore.lockInfo({
        length: this.timeOriginal,
        type: this.scheduleStore.getCurrentItem.type
      })
      this.scheduleNextTick({ decrement: false })
    },

    pauseOrStopTimer (stop = false) {
      this.clearTickHandle()
      this.timerTick({ nextState: stop ? TimerState.RESET : TimerState.PAUSED })

      if (stop) {
        this.scheduleStore.lockInfo({
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
