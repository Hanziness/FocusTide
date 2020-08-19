import dayjs from 'dayjs'
import dayjsduration from 'dayjs/plugin/duration'
import dayjsutc from 'dayjs/plugin/utc'
import { UserEventType } from '@/store/events'

dayjs.extend(dayjsduration)
dayjs.extend(dayjsutc)

export const timerMode = {
  NULL: 0,
  WORK: 1,
  SHORTPAUSE: 2,
  LONGPAUSE: 3
}

export const timerState = {
  STOPPED: 0,
  RUNNING: 1,
  PAUSED: 2,
  COMPLETED: 3
}

export const functionUpdateGroup = {
  TICK: 0,
  COMPLETE: 1
}

export const state = () => ({
  timerRemaining: 20999,
  timerOriginal: 20999,
  lastUpdate: dayjs(),
  nextTickDelta: 1000,
  timerHandle: null,
  timerState: timerState.STOPPED,
  tickFunctions: {},
  completeFunctions: {},
  mode: timerMode.NULL,
  timeFormat: 'mm:ss'
})

function notifyFunctions (state, { group = functionUpdateGroup.TICK, elapsedDelta }) {
  let updateGroup = state.tickFunctions
  switch (group) {
    case functionUpdateGroup.TICK:
      updateGroup = state.tickFunctions
      break
    case functionUpdateGroup.COMPLETE:
      updateGroup = state.completeFunctions
      break
  }

  for (const fnEntry of Object.entries(updateGroup)) {
    // these are [key, value] pairs, we don't need the key (for now)
    if (fnEntry[1].enabled) {
      fnEntry[1].fn(state, elapsedDelta)
    }
  }
}

export const getters = {
  getFormattedRemainingTime (state) {
    return dayjs.utc(state.timerRemaining).format(state.timeFormat)
  },

  isRunning (state) {
    return state.timerState === timerState.RUNNING
  },

  isStopped (state) {
    return state.timerState === timerState.STOPPED
  },

  completedFraction (state) {
    // round values to lower thousand
    const origTimer = state.timerOriginal - (state.timerOriginal % 1000)
    const remTimer = state.timerRemaining - (state.timerRemaining % 1000)
    return (origTimer - remTimer) / origTimer
  }
}

export const mutations = {
  /** Resets the remaining time to the original value, resetting the timer to 0% */
  resetTimer (state) {
    state.timerRemaining = state.timerOriginal
  },

  /** Useful when dayjs locale has changed (forces an update on the timer) */
  refreshTime (state) {
    state.timerRemaining -= 1
    state.timerRemaining += 1
  },

  /** Changes the timer's state to the new one (eg. to PAUSED) */
  setTimerState (state, newState) {
    state.timerState = newState
  },

  /** Sets the new timer handle */
  setTimerHandle (state, newHandle) {
    state.timerHandle = newHandle
  },

  /** Clears the tick handle and stops ticking */
  clearTickHandle (state) {
    clearTimeout(state.timerHandle)
    state.timerHandle = null
  },

  /** Resets the remaining and original times to the new value */
  setTimes (state, newTimeInMs) {
    state.timerRemaining = newTimeInMs
    state.timerOriginal = newTimeInMs
  },

  /** Changes `nextTickDelta` to the new value */
  changeTickDelta (state, newTickMs) {
    state.nextTickDelta = Math.max(50, newTickMs)
  },

  /** Subscribes `fn` function with ID `id` for a notification group. */
  subscribeToNotify (state, { fn, id, functionGroup = functionUpdateGroup.TICK, enabled = true }) {
    switch (functionGroup) {
      case functionUpdateGroup.TICK:
        if (!state.tickFunctions[id]) { state.tickFunctions[id] = { enabled, fn } }
        break
      case functionUpdateGroup.COMPLETE:
        if (!state.completeFunctions[id]) { state.completeFunctions[id] = { enabled, fn } }
        break
    }
  },

  /**
   * Adaptable tick function for handling the timer
   * @param {*} state The Vuex store state
   * @param {timerState} nextState The next state the timer will be in (if not RUNNING), it won't tick further
   * @param {boolean} decrement If set to false, the timer will tick this time, but won't affect the remaining time
   */
  timerTick (state, { nextState = timerState.RUNNING, decrement = true }) {
    // console.log('Hello, tick')
    const newUpdate = new Date().getTime()
    // console.log(typeof state.lastUpdate)
    const elapsedDelta = newUpdate - state.lastUpdate
    console.log('Elapsed ' + elapsedDelta + 'ms')

    // update remaining time if the timer is still running
    if (state.timerState === timerState.RUNNING) {
      if (decrement) {
        state.timerRemaining = Math.max(state.timerRemaining - elapsedDelta, 0)
      }
      state.lastUpdate = newUpdate
    }

    // check if timer completed and schedule next tick
    if (state.timerRemaining <= 0) {
      // timer completed, notify participants
      state.timerState = timerState.COMPLETED
      notifyFunctions(state, { group: functionUpdateGroup.COMPLETE, elapsedDelta })
    } else if (nextState === timerState.RUNNING) {
      // next tick is scheduled in the action
    } else {
      // do not tick further
      state.timerState = nextState
    }

    // execute subscribed update functions
    if (decrement) {
      notifyFunctions(state, { group: functionUpdateGroup.TICK, elapsedDelta })
    }
  }
}

export const actions = {
  /** Initialized some default tick-handler functions */
  initDefaultSubscribeFunctions ({ commit, dispatch }) {
    commit('subscribeToNotify', {
      fn (state) {
        dispatch('events/advanceSchedule', { isAutoAdvance: true }, { root: true })
        dispatch('startTimer')
      },
      id: 'auto-advance',
      functionGroup: functionUpdateGroup.COMPLETE
    })
  },

  /** Changes the tick delta. If `immediate` is true, it also forces a tick. */
  changeTickDelta ({ commit, dispatch }, { newTickDelta, immediate = false }) {
    commit('changeTickDelta', newTickDelta)

    if (immediate) {
      dispatch('scheduleNextTick', {})
    }
  },

  /** Starts or resumes the timer */
  startTimer ({ commit, state, dispatch }) {
    if (state.timerState === timerState.RUNNING) {
      // timer is set to be running, don't do anything
      return
    }

    if (state.timerState === timerState.PAUSED) {
      // do not touch remaining time
    } else if (state.timerState === timerState.STOPPED || state.timerState === timerState.COMPLETED) {
      commit('resetTimer')
    }

    commit('setTimerState', timerState.RUNNING)
    // commit('timerTick', { decrement: false }) // just update the tick timestamp
    dispatch('scheduleNextTick', { decrement: false })
    dispatch('events/recordUserEvent', UserEventType.TIMER_START, { root: true })
  },

  /**
   * Main ticking loop that continously schedules ticks. If called with `decrement == false`,
   * the timer will tick but its value will not decrease.
   */
  scheduleNextTick ({ commit, state, dispatch, rootGetters }, { decrement = true }) {
    commit('timerTick', { decrement })

    if (state.timerState === timerState.RUNNING) {
      // check adaptive ticking settings
      let nextTickMs = rootGetters['settings/getAdaptiveTickRate']

      // schedule next tick
      if (Math.abs(nextTickMs - state.nextTickDelta) > 50) {
        dispatch('changeTickDelta', { newTickDelta: nextTickMs })
        console.log('Changed tick delta to ' + nextTickMs)
      }

      nextTickMs = Math.min(nextTickMs, state.timerRemaining)
      const timeoutHandle = setTimeout(
        () => { dispatch('scheduleNextTick', { }) },
        nextTickMs
      )

      if (state.timerHandle) {
        commit('clearTickHandle')
      }
      commit('setTimerHandle', timeoutHandle)
    }
  },

  pauseOrStopTimer ({ commit, state, dispatch }, stop = false) {
    // if the timer is not running OR it's not (paused and we want to stop it), we shouldn't do anything
    if (state.timerState !== timerState.RUNNING && !(state.timerState === timerState.PAUSED && stop)) {
      return
    }

    commit('clearTickHandle')
    commit('timerTick', { nextState: stop ? timerState.STOPPED : timerState.PAUSED })

    if (stop) {
      commit('resetTimer')
      dispatch('events/recordUserEvent', UserEventType.TIMER_STOP, { root: true })
    } else {
      dispatch('events/recordUserEvent', UserEventType.TIMER_PAUSE, { root: true })
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
  }
}
