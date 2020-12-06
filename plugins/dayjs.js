import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import dayjsrelativetime from 'dayjs/plugin/relativeTime'

import { AvailableTimers } from '@/store/settings'

// English and Hungarian locales
import(/* webpackChunkName: "dayjsLocales", webpackMode: "eager" */ 'dayjs/locale/en')
import(/* webpackChunkName: "dayjsLocales", webpackMode: "eager" */ 'dayjs/locale/hu')

dayjs.extend(utc)
dayjs.extend(dayjsrelativetime)

export default function ({ store }, inject) {
  inject('dayjs', {
    formatMs (ms, { format = 'mm:ss' }) {
      return dayjs.utc(Math.round(ms / 1000) * 1000).format(format)
    },
    formatRelative (ms, { lang = null }) {
      let instance = dayjs()
      if (lang) {
        instance = instance.locale(lang)
      } else if (store.state.settings.lang) {
        instance = instance.locale(store.state.settings.lang)
      }
      return instance.to(dayjs().add(ms, 'millisecond'), true)
    },
    formatPercentage (ms, { total, addPercentage = true }) {
      const msRounded = ms - (ms % 1000)
      const totalRounded = total - (total % 1000)
      const percentageValue = Math.round(((totalRounded - msRounded) / totalRounded) * 100)
      return '' + percentageValue + (addPercentage ? '%' : '')
    },
    getFormattedTime (ms, config = store.state.settings.currentTimer, additionalArgs = {}) {
      switch (config) {
        case AvailableTimers.TIMER_TRADITIONAL:
          return this.formatMs(ms, additionalArgs)
        case AvailableTimers.TIMER_APPROXIMATE:
          return this.formatRelative(ms, additionalArgs)
        case AvailableTimers.TIMER_PERCENTAGE:
          return this.formatPercentage(ms, additionalArgs)
        default:
          return ''
      }
    },
    dayjs
  })
}
