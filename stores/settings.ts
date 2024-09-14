import { defineStore } from 'pinia'
import { EventType, useEvents } from './events'
import TickMultipliers from '~~/assets/settings/adaptiveTickingMultipliers'
import timerPresets from '~~/assets/settings/timerPresets'

export enum TimerType {
  Traditional = 'traditional',
  Approximate = 'approximate',
  Percentage = 'percentage'
}

export enum SectionEndAction {
  /** Continue ticking after the section ended */
  KeepTicking = 'continue',
  /** Stop the timer after the section ended, displaying a checkmark */
  Stop = 'stop',
  /** Automatically start the next section as soon as the previous one ended */
  Skip = 'skip'
}

export enum SoundSet {
  Musical = 'musical'
}

export enum Section {
  work = 'work',
  shortpause = 'shortpause',
  longpause = 'longpause'
}

export interface Settings {
  _updated: boolean,
  lang?: string,
  visuals: {
    theme: {
      work: number[],
      shortpause: number[],
      longpause: number[]
    },
    darkMode: boolean
    },
    performance: {
      showProgressBar: boolean
    },
    schedule: {
      lengths: {
        work: number,
        shortpause: number,
        longpause: number
      },
      longPauseInterval: number, // every 3rd pause is a long one,
      autoStartNextTimer: {
        wait: number,
        autostart: boolean
      },
      numScheduleEntries: number,
      visibility: {
        enabled: boolean,
        showSectionType: boolean
      }
    },
    eventLoggingEnabled: boolean,
    currentTimer: TimerType,
    sectionEndAction: SectionEndAction,
    adaptiveTicking: {
      enabled: boolean,
      baseTickRate: number,
      registeredHidden: boolean | null
    },
    permissions: {
      notifications: boolean | null,
      audio: boolean
    },
    audio: {
      volume: number,
      repeatTimes: number,
      soundSet: SoundSet
    },
    timerControls: {
      enableKeyboardShortcuts: boolean
    },
    tasks: {
      enabled: boolean,
      maxActiveTasks: number,
      removeCompletedTasks: boolean
    },
    pageTitle: {
      useTickEmoji: boolean
    },
    mobile: {
      notifications: {
        sectionOver: true,
        persistent: boolean
      }
    },
    reset: boolean
}

export enum ColorMethod {
  /** `rgb(r, g, b)` */
  classic,

  /** `r g b` */
  modern
}

export const AvailableSoundSets = {
  SOUNDSET_MUSICAL: 'musical'
}

export const useSettings = defineStore('settings', {
  state: () : Settings => ({
    _updated: false,
    lang: undefined,
    visuals: {
      theme: {
        work: [255, 107, 107],
        shortpause: [244, 162, 97],
        longpause: [46, 196, 182]
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
      numScheduleEntries: 3,
      visibility: {
        enabled: true,
        showSectionType: true
      }
    },
    eventLoggingEnabled: false,
    sectionEndAction: SectionEndAction.Skip,
    currentTimer: TimerType.Approximate,
    adaptiveTicking: {
      enabled: true,
      baseTickRate: 1000,
      registeredHidden: null
    },
    permissions: {
      notifications: false,
      audio: true
    },
    audio: {
      volume: 0.9,
      repeatTimes: 2,
      soundSet: SoundSet.Musical
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
    getCurrentLocale: (state) => {
      return state.lang ?? 'en'
    },

    getActiveSchedulePreset: (state) => {
      const index = Object.entries(timerPresets).findIndex(([_key, value]) => {
        return JSON.stringify(value.lengths) === JSON.stringify(state.schedule.lengths)
      })

      if (index >= 0) {
        return Object.keys(timerPresets)[index]
      } else {
        return undefined
      }
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
      return (color: keyof Settings['visuals']['theme'], method: ColorMethod = ColorMethod.classic): string => {
        if (method === ColorMethod.classic) {
          return `rgb(${state.visuals.theme[color].join(',')})`
        } else {
          return state.visuals.theme[color].join(' ')
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

    applyPreset (id: string) {
      const validate = (id: string): id is keyof typeof timerPresets => {
        return Object.keys(timerPresets).includes(id)
      }

      if (validate(id)) {
        this.schedule.lengths = Object.assign({}, timerPresets[id].lengths)
      }
    },

    setReset (shouldReset: boolean) {
      this.reset = shouldReset
    }
  }
})
