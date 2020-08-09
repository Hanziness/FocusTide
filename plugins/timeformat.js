import { sub, addSeconds, lightFormat, formatDistance, differenceInSeconds, differenceInMinutes } from 'date-fns'

const timeUtils = {
  datefns: {
    sub,
    addSeconds,
    formatDistance,
    differenceInSeconds,
    differenceInMinutes
  },

  timerFormat (date) {
    return lightFormat(date, 'HH:mm:ss')
  }
}

export default (context, inject) => {
  inject('timeFormat', timeUtils)
}
