import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

dayjs.extend(duration)
dayjs.extend(utc)

const dayjsUtils = {
  getDiff (start, target) {
    return dayjs.duration(target.diff(start))
  },
  formatMs (ms, format = 'mm:ss') {
    return dayjs.utc(ms).format(format)
  },
  dayjs
}

export default function (context, inject) {
  inject('dayjs', dayjsUtils)
}
