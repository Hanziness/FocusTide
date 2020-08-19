export default {
  section: {
    work: 'Work',
    shortpause: 'Break',
    longpause: 'Long Break',
    wait: 'Waiting'
  },
  settings: {
    heading: 'Settings',
    tabs: {
      main: 'Main',
      timer: 'Schedule',
      display: 'Display'
    },
    values: {
      eventLoggingEnabled: {
        _title: 'Enable event logging',
        _description: ''
      },
      currentTimer: {
        _title: 'Timer style',
        _description: '',
        _values: {
          traditional: 'Traditional',
          approximate: 'Approximate',
          percentage: 'Percentage'
        }
      },
      schedule: {
        longPauseInterval: {
          _title: 'Long Pause interval',
          _description: ''
        },
        numScheduleEntries: {
          _title: 'Number of entries in schedule',
          _description: ''
        }
      },
      performance: {
        showProgressBar: {
          _title: 'Show progress bar',
          _description: 'Show progress behind timer'
        }
      }
    }
  }
}
