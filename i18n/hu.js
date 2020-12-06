export default {
  section: {
    work: 'Munka',
    shortpause: 'Szünet',
    longpause: 'Hosszú szünet',
    wait: 'Várakozás'
  },
  controls: {
    start: 'Időzítő indítása',
    pause: 'Időzítő szünetelése',
    stop: 'Időzítő visszaállítása',
    next: 'Következő szakasz'
  },
  settings: {
    heading: 'Beállítások',
    tabs: {
      main: 'Alap',
      timer: 'Órarend',
      display: 'Megjelenés',
      audio: 'Hang'
    },
    buttons: {
      close: 'Bezárás',
      reset: 'Visszaállítás'
    },
    values: {
      lang: {
        _title: 'Nyelv',
        _description: '',
        _values: {
          en: 'Angol',
          hu: 'Magyar'
        },
        _valueDescription: {
          en: '',
          hu: ''
        }
      },
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
      },
      permissions: {
        audio: {
          _title: 'Hang lejátszása',
          _description: 'Az alkalmazás hangot játszhat le, ha véget ért egy szakasz'
        },
        notifications: {
          _title: 'Értesítések engedélyezése',
          _description: 'Az alkalmazás értesítést küldhet, ha véget ért egy szakasz'
        }
      },
      audio: {
        volume: {
          _title: 'Hangerő',
          _description: ''
        },
        soundSet: {
          _title: 'Hangkészlet',
          _description: 'Az értesítésekhez használt hangok',
          _values: {
            musical: 'Zenés'
          },
          _valueDescription: {
            musical: 'Az alapértelmezett hangok'
          }
        }
      }
    }
  },
  notification: {
    action: {
      ready: 'Gyerünk!'
    },
    work: {
      title: 'Ideje újra dolgozni!',
      body: 'Vége a szünetnek. Dolgozz egy kicsit, majd pihenj megint.'
    },
    shortpause: {
      title: 'Szünidő',
      body: 'Szép munka! Megérdemelsz egy kis szünetet.'
    },
    longpause: {
      title: 'Ejha! Még több szabadidő!',
      body: 'Nem semmi. Ennyi munka után megérdemelsz egy kis extra szünidőt.'
    }
  }
}
