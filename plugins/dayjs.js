import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import dayjsrelativetime from 'dayjs/plugin/relativeTime'

import { AvailableTimers } from '@/store/settings'

// English and Hungarian locales
require('dayjs/locale/en')
require('dayjs/locale/hu')

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(dayjsrelativetime)

const dayjsUtils = {
  getDiff (start, target) {
    return dayjs.duration(target.diff(start))
  },
  formatMs (ms, { format = 'mm:ss' }) {
    return dayjs.utc(Math.floor(ms / 1000) * 1000).format(format)
  },
  formatRelative (ms) {
    return dayjs().to(dayjs().add(ms, 'millisecond'), true)
  },
  formatPercentage (ms, { total }) {
    const msRounded = ms - (ms % 1000)
    const totalRounded = total - (total % 1000)
    return '' + Math.round(((totalRounded - msRounded) / totalRounded) * 100) + '%'
  },
  getFormattedTime (ms, config = AvailableTimers.TIMER_TRADITIONAL, additionalArgs = {}) {
    switch (config) {
      case AvailableTimers.TIMER_TRADITIONAL:
        return this.formatMs(ms, additionalArgs)
      case AvailableTimers.TIMER_APPROXIMATE:
        return this.formatRelative(ms)
      case AvailableTimers.TIMER_PERCENTAGE:
        return this.formatPercentage(ms, additionalArgs)
      default:
        return ''
    }
  },
  dayjs
}

export default function (context, inject) {
  inject('dayjs', dayjsUtils)
}
