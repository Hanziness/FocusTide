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
        }
      },
      performance: {
        showProgressBar: {
          _title: 'Folyamatjelző mutatása',
          _description: 'Az óra mögött jelenjen meg a folyamat'
        }
      }
    }
  }
}
