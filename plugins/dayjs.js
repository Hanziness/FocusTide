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
    return dayjs.utc(ms).format(format)
  },
  formatRelative (ms) {
    return dayjs().to(dayjs().add(ms, 'millisecond'), true)
  },
  getFormattedTime (ms, config = AvailableTimers.TIMER_TRADITIONAL, additionalArgs = {}) {
    switch (config) {
      case AvailableTimers.TIMER_TRADITIONAL:
        return this.formatMs(ms, additionalArgs)
      case AvailableTimers.TIMER_APPROXIMATE:
        return this.formatRelative(ms)
      default:
        return ''
    }
  },
  dayjs
}

export default function (context, inject) {
  inject('dayjs', dayjsUtils)
}
