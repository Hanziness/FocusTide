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
    return (state.timerOriginal - state.timerRemaining) / state.timerOriginal
  }
}

export const mutations = {
  resetTimer (state) {
    state.timerRemaining = state.timerOriginal
  },

  setTimerState (state, newState) {
    state.timerState = newState
  },

  setTimerHandle (state, newHandle) {
    state.timerHandle = newHandle
  },

  clearTickHandle (state) {
    clearTimeout(state.timerHandle)
    state.timerHandle = null
  },

  setTimes (state, newTimeInMs) {
    state.timerRemaining = newTimeInMs
    state.timerOriginal = newTimeInMs
  },

  changeTickDelta (state, newTickMs) {
    state.nextTickDelta = Math.max(50, newTickMs)
  },

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
   * @param {*} context The Vuex store context
   * @param {timerState} nextState The next state the timer will be in (if not RUNNING), it won't tick further
   * @param {boolean} decrement If set to false, the timer will tick this time, but won't affect the remaining time
   */
  timerTick (state, { nextState = timerState.RUNNING, decrement = true }) {
    // console.log('Hello, tick')
    const newUpdate = dayjs()
    // console.log(typeof state.lastUpdate)
    const elapsedDelta = dayjs(newUpdate).diff(state.lastUpdate, 'millisecond')

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

  changeTickDelta ({ commit, dispatch }, { newTickDelta, immediate = false }) {
    commit('changeTickDelta', newTickDelta)

    if (immediate) {
      dispatch('scheduleNextTick', {})
    }
  },

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

  scheduleNextTick ({ commit, state, dispatch }, { decrement = true }) {
    commit('timerTick', { decrement })
    if (state.timerState === timerState.RUNNING) {
      // schedule next tick
      const nextTickMs = Math.min(state.nextTickDelta, state.timerRemaining)
      const timeoutHandle = setTimeout(
        () => { dispatch('scheduleNextTick', { }) },
        nextTickMs
      )
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

  setNewTimer ({ commit, dispatch }, newTimerMs) {
    dispatch('pauseOrStopTimer', true)
    commit('setTimes', newTimerMs)
  },

  getTimerFromSchedule ({ rootState, dispatch }) {
    dispatch('setNewTimer', rootState.events.schedule[0]._length)
  }
}
