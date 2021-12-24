export default {
  index: {
    app_description: 'Ingyenes Pomodoro alkalmazás közvetlenül a böngésződben',
    cta: {
      quickstart: 'Gyorsindítás',
      or: 'vagy',
      configure: 'Beállítás'
    },
    features: {
      0: {
        title: 'Tiszta kezelőfelület',
        description: 'Csak az időzítőd, a kötelező vezérlők és egy csomó beállítási lehetőség'
      },
      1: {
        title: 'Nem kell telepíteni',
        description: 'A böngésződben fut, indítás után teljesen offline'
      },
      2: {
        title: 'Ingyenes & nyílt forrású',
        description: 'Nincsenek rejtett követők, bárki megtekintheti és hozzáadhat a forráskódhoz'
      }
    },
    section_03: {
      title: 'Mire jó ez?',
      subtitle: 'Az {0} segít kordában tartani az idődet. Te csak dolgozz vagy pihenj, amikor azt mondja.',
      cards: [
        {
          title: 'Munka',
          description: 'Ideje tenni a tennivalót',
          info: '25 perc'
        },
        {
          title: 'Szünet',
          description: 'Nézz meg egy videót, olvass el egy cikket vagy igyál egy kávét',
          info: '5-15 perc'
        },
        {
          title: 'Ismétlés',
          description: 'Újra! Még egy pár kör és kapsz egy kis plusz pihenőt!'
        }
      ],
      try_it: {
        base: 'Ha úgy érzed, túl sok macskás videót nézel munka helyett, akkor {0}.',
        try: 'próbáld ki'
      }
    },
    faq: {
      title: 'GYIK',
      hint: 'Tipp',
      accordion: {
        change_timers: {
          q: 'Átállíthatom az időzítőket?',
          a: 'Persze! Úgy állíthatod be a munka, szünet és hosszú szünet időzítőket, ahogy neked tetszik! Azt is megváltoztathatod, hogy milyen gyakran legyenek hosszú szünetek!'
        },
        will_it_help: {
          q: 'Segíteni fog rajtam ez az alkalmazás?',
          a: 'Ez rajtad áll. Az alkalmazás mindent megtesz, hogy egy motiváló környezetet teremtsen a letisztult megjelenésével, de tőled függ, hogy követed-e a menetrendet.',
          hint: 'Ha úgy érzed, nem tudsz 25 percig egyfolytában dolgozni vagy rövid az 5 perces szünet, állítsd át az időzítőket valami könyelmesebbre. Ne add fel, kövess egy lazább menetrendet és napról-napra szigoríts rajta egy kicsit.'
        },
        data_collection: {
          q: 'Gyűjt az alkalmazás bármilyen adatot?',
          a: 'Nem! Az alkalmazás csak a böngésződben fut, nem gyűjt és nem küld adatot sehova!'
        },
        remember_settings: {
          q: 'De akkor hogyan jegyzi meg a beállításaimat?',
          a: 'Ehhez a böngésződre támaszkodik. Ha törlöd a böngészőből az adataidat, az alkalmazás beállításai is alaphelyzetbe állnak.',
          hint: 'Ha meg akarod tartani a beállításaidat, ne privát böngészésben (inkognitó módban) használd.'
        },
        need_to_know: {
          q: 'Mit kell tudnom az alkalmazás használatához?',
          a: 'Semmit. Ha nem akarsz a beállítások között matatni, csak indítsd el az időzítőt és dolgozz a hangjelzésig. Amint kész vagy, indítsd el a következő időzítőt. Semmi extra tudásra nem lesz szükség, csak figyelj a hátralévő időre!'
        },
        timer_style: {
          q: 'Melyik időzítő-stílust használjam?',
          a: 'Ez attól függ, mennyire akarod, hogy pontos legyen az az időzítő. Választhatsz hagyományos ("12:34", másodpercre pontos), közelítő ("13 perc", szöveges és percre pontos), valamint százalékos ("50%") megjelenítés közül.'
        }
      }
    },
    section_04: {
      title: 'Funkciók',
      list: {
        customization: 'Testreszabható',
        notifications: 'Hang & Értesítések',
        flexible: 'Rugalmas',
        pwa: 'Offline',
        opensource: 'Nyílt forrású',
        notrackers: 'Nincsenek követők',
        noads: 'Nincs reklám & felugró ablak',
        clean: 'Letisztult megjelenés',
        adaptiveticking: 'Adaptív ketyegés',
        localization: 'Magyarul is tud',
        darkmode: 'Sötét téma',
        more: '... és még több'
      }
    },
    section_05: {
      title: 'Támogasd a projektet',
      subtitle: {
        0: 'Az AnotherPomodoro hobbiprojektként készült, bárminemű anyagi bevétel szándéka nélkül.',
        1: {
          base: 'Ha ennek ellenére úgy érzed, megérdemli, {0}.',
          action: 'támogasd a szerzőt egy kávéval'
        }
      },
      support: {
        github: 'Megtekintés GitHubon',
        buymeacoffee: 'Fejlesztő meghívása egy kávéra'
      },
      credits: '❤ Szeretettel készítette: Gera Imre'
    }
  },
  setup: {
    head: 'Beállítás',
    title: 'Indulás',
    startButton: 'Hajrá',
    steps: {
      preset: 'Válassz előbeállítást'
    },
    presets: {
      traditional: {
        title: 'Abszolút hagyományos',
        description: 'Tipikus Pomodoro időzítő 25 perc munkával, 5 perces szünetekkel és 15 perces hosszú szünettel. A klasszikus időzítőt használja.'
      },
      default: {
        title: 'Alapértelmezett',
        description: 'Egy alap beállítás a közelítő időzítővel.'
      },
      hardcore: {
        title: 'Ne nézz, dolgozz',
        description: 'Órás ciklusok 50 perc munkával és 10 perc szünettel. A százalékos időzítőt használja, így kevésbé kell aggódnod a hátralévő időn.'
      }
    }
  },
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
    reset: {
      title: 'Alaphelyzetbe állítás',
      confirm: 'Visszaállítás',
      cancel: 'Mégsem'
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
        visibility: {
          enabled: {
            _title: 'Órarend mutatása',
            _description: ''
          },
          showSectionType: {
            _title: 'Szakasz típusának megjelenítése',
            _description: 'Megjeleníti a jelenlegi szakasz típusát az órarend alatt'
          }
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
      },
      timerControls: {
        enableKeyboardShortcuts: {
          _title: 'Billentyűzettel történő vezérlés',
          _description: 'Időzítő indítása/megállítása a szóköz gombbal'
        }
      },
      tasks: {
        enabled: {
          _title: 'Feladatlista',
          _description: 'Kezeld a teendőidet közvetlenül az alkalmazásból'
        },
        maxActiveTasks: {
          _title: 'Maximum aktív feladatok',
          _description: 'Legfeljebb ennyi aktív feladatot mutat majd a lista'
        },
        removeCompletedTasks: {
          _title: 'Kész feladatok törlése',
          _description: 'Új szakaszra lépéskor törlődnek a kész feladatok'
        }
      },
      pageTitle: {
        useTickEmoji: {
          _title: 'Pipa jel használata a címsorban',
          _description: 'Mutasson ✔ emojit a "kész" helyett az alkalmazás'
        }
      },
      visuals: {
        darkMode: {
          _title: 'Sötét téma bekapcsolása',
          _description: 'Kevesebb fényerő, ugyanannyi produktivitás'
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
  },
  error: {
    format_invalid: 'Hibás formátum',
    range_invalid: 'Az érték {min} és {max} között legyen',
    required: 'Ezt a mezőt ki kell tölteni',
    numeric: 'A beírt értéknek számnak kell lennie',
    min: 'Az érték legalább {min} legyen',
    max: 'Az érték legfeljebb {max} legyen',
    time_format: 'Hibásan formázott idő (PP:MM)',
    undefined: 'Ismeretlen hiba'
  },
  tasks: {
    title: 'Feladatok',
    form: {
      title: 'cím',
      description: 'leírás (nem kötelező)'
    },
    empty: 'Nincs felvett teendő',
    manage: 'Kezelés'
  },
  ready: 'Kész'
}
