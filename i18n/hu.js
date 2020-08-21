export default {
  section: {
    work: 'Munka',
    shortpause: 'Szünet',
    longpause: 'Hosszú szünet',
    wait: 'Várakozás'
  },
  settings: {
    heading: 'Beállítások',
    tabs: {
      main: 'Alap',
      timer: 'Órarend',
      display: 'Megjelenés'
    },
    buttons: {
      close: 'Bezárás'
    },
    values: {
      eventLoggingEnabled: {
        _title: 'Eseménynaplózás engedélyezése',
        _description: ''
      },
      currentTimer: {
        _title: 'Időzítő típusa',
        _description: '',
        _values: {
          traditional: 'Hagyományos',
          approximate: 'Közelítő',
          percentage: 'Százalékos'
        },
        _valueDescription: {
          traditional: '12:34',
          approximate: '13 perc',
          percentage: '50%'
        }
      },
      adaptiveTicking: {
        enabled: {
          _title: 'Adaptív ketyegés engedélyezése',
          _description: 'Az időzítő kevesebbszer fog frissülni, amíg háttérben van'
        }
      },
      schedule: {
        longPauseInterval: {
          _title: 'Hosszú szünetek gyakorisága',
          _description: ''
        },
        numScheduleEntries: {
          _title: 'Órarend elemeinek száma',
          _description: ''
        },
        showSchedule: {
          _title: 'Órarend megjelenítése',
          _description: ''
        },
        lengths: {
          _title: 'Órarend előbeállítás',
          _description: '',
          _values: {
            default: 'Alapértelmezett',
            debug: 'Debug',
            custom: 'Egyedi'
          },
          _valueDescription: {
            default: '25 perc munka, 5 perc szünet',
            debug: 'Tesztelési célokra',
            custom: 'Felhasználói beállítások'
          },
          work: {
            _title: 'Munka hossza',
            _description: ''
          },
          shortpause: {
            _title: 'Szünet hossza',
            _description: ''
          },
          longpause: {
            _title: 'Hosszú szünet hossza',
            _description: ''
          }
        }
      },
      performance: {
        showProgressBar: {
          _title: 'Folyamatjelző mutatása',
          _description: 'Az óra mögött jelenjen meg a folyamatsáv'
        }
      }
    }
  }
}
