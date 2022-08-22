import { defineStore } from 'pinia'
import { EventType, useEvents } from './events'
import TickMultipliers from '@/assets/settings/adaptiveTickingMultipliers'
import timerPresets from '@/assets/settings/timerPresets'
import { languages } from '~~/plugins/i18n'

export enum ColorMethod {
  /** `rgb(r, g, b)` */
  classic,

  /** `r g b` */
  modern
}

export const AvailableTimers = {
  TIMER_TRADITIONAL: 'traditional',
  TIMER_APPROXIMATE: 'approximate',
  TIMER_PERCENTAGE: 'percentage'
}

export const AvailableSoundSets = {
  SOUNDSET_MUSICAL: 'musical'
}

const getDefaultLocale = () : string => {
  if (process.server || !window || !window.navigator || !window.navigator.language) {
    return 'en'
  }

  const consideredLanguages = Object.keys(languages).filter(lang => window.navigator.language.split('-')[0].includes(lang))
  return consideredLanguages.length > 0 ? consideredLanguages[0] : 'en'
}

export const useSettings = defineStore('settings', {
  state: () => ({
    _updated: false,
    lang: getDefaultLocale(),
    visuals: {
      // TODO breaking change, previously it was a string: 'rgb(r, b, g)'
      work: {
        colour: [255, 107, 107]
      },
      shortpause: {
        colour: [244, 162, 97]
      },
      longpause: {
        colour: [46, 196, 182]
      },
      wait: {
        colour: [222, 226, 230]
      },
      darkMode: false
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
      visibility: {
        enabled: true,
        showSectionType: true
      }
    },
    eventLoggingEnabled: false,
    currentTimer: AvailableTimers.TIMER_APPROXIMATE,
    adaptiveTicking: {
      enabled: true,
      baseTickRate: 1000,
      registeredHidden: null
    },
    permissions: {
      notifications: null as boolean,
      audio: true
    },
    audio: {
      volume: 0.9,
      repeatTimes: 2,
      soundSet: 'musical'
    },
    timerControls: {
      enableKeyboardShortcuts: true
    },
    tasks: {
      enabled: false,
      maxActiveTasks: 3,
      removeCompletedTasks: true
    },
    pageTitle: {
      useTickEmoji: true
    },
    mobile: {
      notifications: {
        sectionOver: true,
        persistent: false
      }
    },
    reset: false
  }),

  getters: {
    isUserPresetActive: (state) => {
      return JSON.stringify(timerPresets.user) === JSON.stringify(state.schedule.lengths)
    },

    getActiveSchedulePreset: (state) => {
      for (const key in timerPresets) {
        if (JSON.stringify(timerPresets[key].lengths) === JSON.stringify(state.schedule.lengths)) {
          return key
        }
      }

      return null
    },

    getAdaptiveTickRate: (state) => {
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

    performanceSettings: (state) => {
      return state.performance
    },

    getColor: (state) => {
      return (color: string, method: ColorMethod = ColorMethod.classic) => {
        if (method === ColorMethod.classic) {
          return `rgb(${(state.visuals[color].colour as number[]).join(',')})`
        } else if (method === ColorMethod.modern) {
          return (state.visuals[color].colour as number[]).join(' ')
        }
      }
    }
  },

  actions: {
    // mutations
    registerNewHidden (newHidden = document.hidden) {
      this.adaptiveTicking.registeredHidden = newHidden
      useEvents().recordEvent(newHidden === true ? EventType.FOCUS_LOST : EventType.FOCUS_GAIN)
    },

    applyPreset (id) {
      if (timerPresets[id]) {
        this.schedule.lengths = Object.assign({}, timerPresets[id].lengths)
      }
    },

    /** @deprecated Use Pinia's $patch method instead! */
    mergeSettings (newSettings) {
      // reset settings before merging new ones
      this.$reset()

      for (const key in newSettings) {
        if (Object.hasOwnProperty.call(newSettings, key)) {
          if (typeof newSettings[key] === 'object') {
            // perform merge
            this[key] = {
              ...this[key],
              ...newSettings[key]
            }
          } else {
            this[key] = newSettings[key]
          }
        }
      }
    },

    changeClockStyle (newStyle) {
      if (Object.values(AvailableTimers).findIndex(newStyle) !== -1) {
        this.currentTimer = newStyle
      }
    },

    /**
     * @deprecated Change the state directly instead
     */
    SET ({ key, value, byRef = false }) {
      /*
       * example: key = ['a', 'b']
       * we find currentElement = state.settings.a, then set currentElement[b] = value
       * if we found state.settings.a.b at first, we couldn't change the value as
       * we wouldn't have a reference to the (primitive) a.b!
       */

      // find parent object
      let currentElement = this.$state
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
    },

    setReset (shouldReset) {
      this.reset = shouldReset
    },

    /**
     * Mutation to force hydration after use of `replaceState`
     * @deprecated This is probably not needed anymore as state can be directly replaced in Pinia
    */
    _setUpdated () {
      this._updated = true
      this._updated = false
    },

    // BEGIN ACTIONS
    /**
     * @deprecated Use Pinia's $reset method instead
     */
    resetSettings (store) {
      const defaults = this.$state()
      defaults.lang = store.state.lang // keep language preference

      // defaults.lang = store.state.lang
      store.commit('mergeSettings', defaults)
    }
  }
})
