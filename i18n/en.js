export default {
  section: {
    work: 'Work',
    shortpause: 'Break',
    longpause: 'Long Break',
    wait: 'Waiting'
  },
  controls: {
    start: 'Start timer',
    pause: 'Pause timer',
    stop: 'Reset timer',
    next: 'Go to next section'
  },
  settings: {
    heading: 'Settings',
    tabs: {
      main: 'Main',
      timer: 'Schedule',
      display: 'Display',
      audio: 'Audio'
    },
    buttons: {
      close: 'Close',
      reset: 'Reset'
    },
    values: {
      lang: {
        _title: 'Language',
        _description: '',
        _values: {
          en: 'English',
          hu: 'Hungarian'
        },
        _valueDescription: {
          en: '',
          hu: ''
        }
      },
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
        },
        _valueDescription: {
          traditional: '12:34',
          approximate: '13 minutes',
          percentage: '50%'
        }
      },
      adaptiveTicking: {
        enabled: {
          _title: 'Enable adaptive ticking',
          _description: 'Timer will tick less frequently while in the background'
        }
      },
      schedule: {
        longPauseInterval: {
          _title: 'Long Break interval',
          _description: ''
        },
        numScheduleEntries: {
          _title: 'Number of entries in schedule',
          _description: ''
        },
        showSchedule: {
          _title: 'Show schedule',
          _description: ''
        },
        lengths: {
          _title: 'Schedule preset',
          _description: '',
          _values: {
            default: 'Default',
            debug: 'Debug',
            custom: 'Custom'
          },
          _valueDescription: {
            default: '25 minutes work, 5 minutes break',
            debug: 'For debugging purposes',
            custom: 'Set by you'
          },
          work: {
            _title: 'Work',
            _description: ''
          },
          shortpause: {
            _title: 'Break',
            _description: ''
          },
          longpause: {
            _title: 'Long break',
            _description: ''
          }
        }
      },
      performance: {
        showProgressBar: {
          _title: 'Show progress bar',
          _description: 'Show progress behind timer'
        }
      },
      permissions: {
        audio: {
          _title: 'Play audio',
          _description: 'Let the app play sounds when a section is over'
        },
        notifications: {
          _title: 'Notification permissions',
          _description: 'Let the app send you notifications when a section is over'
        }
      },
      audio: {
        volume: {
          _title: 'Audio volume',
          _description: ''
        },
        soundSet: {
          _title: 'Sound set',
          _description: 'Sounds used for notifications',
          _values: {
            musical: 'Musical'
          },
          _valueDescription: {
            musical: 'The default sounds'
          }
        }
      }
    }
  },
  notification: {
    action: {
      ready: 'Let\'s go!'
    },
    work: {
      title: 'Time to get back to work!',
      body: 'Your break is over. Work some more, then rest again.'
    },
    shortpause: {
      title: 'Time for a break',
      body: 'Nice, you\'ve earned a short break.'
    },
    longpause: {
      title: 'Whew! More spare time!',
      body: 'Well-well. After working this much, you deserve a longer break.'
    }
  },
  error: {
    format_invalid: 'Invalid input format',
    range_invalid: 'Value must be between {min} and {max}',
    required: 'This field must be filled',
    numeric: 'Value must be a number',
    min: 'Value must be at least {min}',
    max: 'Value must be at most {max}',
    time_format: 'Incorrectly formatted time (MM:SS)',
    undefined: 'Undefined error'
  }
}
