import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import dayjsrelativetime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(utc)
dayjs.extend(dayjsrelativetime)

const dayjsUtils = {
  getDiff (start, target) {
    return dayjs.duration(target.diff(start))
  },
  formatMs (ms, format = 'mm:ss') {
    return dayjs.utc(ms).format(format)
  },
  formatRelative (ms) {
    return dayjs().to(dayjs().add(ms, 'millisecond'), true)
  },
  dayjs
}

export default function (context, inject) {
  inject('dayjs', dayjsUtils)
}
