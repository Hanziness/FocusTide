export default {
  index: {
    app_description: 'Free Pomodoro timer right in your browser',
    cta: {
      quickstart: 'Quickstart',
      or: 'or',
      configure: 'Configure'
    },
    features: {
      0: {
        title: 'Focused, clean interface',
        description: 'Just your timer, the essential controls and a bunch of customizations'
      },
      1: {
        title: 'Nothing to install',
        description: 'Runs in your browser, entirely offline after launch'
      },
      2: {
        title: 'Free & open-source',
        description: 'No hidden trackers, everyone can view and contribute to the code'
      }
    },
    section_03: {
      title: 'What does it do?',
      subtitle: '{0} helps you keep track of your time. Just work or take a break when it says so.',
      cards: [
        {
          title: 'Work',
          description: 'Time to get things done',
          info: '25 minutes'
        },
        {
          title: 'Pause',
          description: 'Watch a video, read an article, drink a coffee',
          info: '5-15 minutes'
        },
        {
          title: 'Repeat',
          description: 'Do it again! A few more rounds and you\'ll get some extra rest!'
        }
      ],
      try_it: {
        base: 'If you watch too many videos of cats while you should be working instead, then {0}.',
        try: 'give it a try'
      }
    },
    faq: {
      title: 'FAQ',
      hint: 'Hint',
      accordion: {
        change_timers: {
          q: 'Can I change those timers?',
          a: 'Absolutely! You can change the work, pause and long pause timers to whatever you want! You can also change how frequent long pauses are!'
        },
        will_it_help: {
          q: 'Will this app help me?',
          a: 'That depends on you. This app tries hard to create a motivating environment with its clean design and flexibility, but it\'s up to you whether you follow the schedule it gives you.',
          hint: 'If you realize you can\'t work 25 minutes straight or a break of 5 minutes is too short, adjust them to something more comfortable. Don\'t give up, follow a more relaxed schedule and progressively go stricter.'
        },
        data_collection: {
          q: 'Does it collect any data?',
          a: 'Nope! The app runs only in your browser, no data is being collected or sent anywhere!'
        },
        remember_settings: {
          q: 'How will it remember my settings then?',
          a: 'It relies on your browser to do that. If you clear your browser data, the app\'s settings will revert to their defaults, too.',
          hint: 'If you want to keep your settings, don\'t use the app in private browsing (incognito mode).'
        },
        need_to_know: {
          q: 'So what do I need to know to use this app?',
          a: 'Absolutely nothing. If you don\'t want to delve into the settings, just start the timer and listen for the audio chime when it finishes. Once it\'s done, start the next timer when you\'re ready. No knowledge is necessary to use this timer, just pay attention to the time left!'
        },
        timer_style: {
          q: 'Which timer style should I use?',
          a: 'That depends on how obscure you want the timer to be. Traditional looks like "12:34" (seconds-precision), approximate looks like "13 minutes" and percentage looks like "50%".'
        }
      }
    },
    section_04: {
      title: 'Feature list',
      list: {
        customization: 'Customization',
        notifications: 'Audio & Notifications',
        flexible: 'Flexible',
        pwa: 'Offline',
        opensource: 'Open-source',
        notrackers: 'No trackers',
        noads: 'No ads & pop-ups',
        clean: 'Clean design',
        adaptiveticking: 'Adaptive ticking',
        localization: 'Multiple languages',
        more: '... and more to come'
      }
    },
    section_05: {
      title: 'Support this project',
      subtitle: {
        0: 'AnotherPomodoro is being developed as a side project with no compensation in mind.',
        1: {
          base: 'If you feel that this is a project worth supporting, please {0}.',
          action: 'do so'
        }
      },
      support: {
        github: 'View on GitHub',
        buymeacoffee: 'Buy the author a coffee'
      },
      credits: 'Made with ❤ by Imre Gera'
    }
  },
  setup: {
    head: 'Setup',
    title: 'Let\'s get you started',
    startButton: 'Let\'s go',
    steps: {
      preset: 'Choose a preset'
    },
    presets: {
      traditional: {
        title: 'Absolutely traditional',
        description: 'Typical Pomodoro setup with 25 minutes of work, 5-minute-long pauses and 15-minute-long long breaks. Uses the classic timer.'
      },
      default: {
        title: 'Default',
        description: 'A sensible default preset with an approximate timer.'
      },
      hardcore: {
        title: 'Work don\'t look',
        description: '1-hour cycles with 50 minutes of work and 10 minutes of pause. Uses the percentage timer so you can worry less about the time left.'
      }
    }
  },
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
