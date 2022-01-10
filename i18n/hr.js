export default {
  index: {
    app_description: 'Besplatni Pomodoro izravno u tvom pregledniku',
    alt: {
      img: {
        screenshot: 'Slika pokrenutog timera u programu AnotherPomodoro',
        icon: 'Ikona programa'
      },
      links: {
        source: 'Pogledaj GitHub stranicu',
        support: 'Kupi autoru kavu',
        share: {
          twitter: 'Prati program na Twitteru',
          facebook: 'Dijeli program na Facebooku',
          reddit: 'Dijeli program na Redditu'
        }
      }
    },
    launch: 'Pokreni',
    cta: {
      quickstart: 'Pokreni',
      or: 'ili',
      configure: 'Postavi čarobnjaka'
    },
    features: {
      0: {
        title: 'Jednostavno sučelje',
        description: 'Samo timer, bitne kontrole i hrpa mogućnosti za prilagođavanje'
      },
      1: {
        title: 'Ništa se ne mora instalirati',
        description: 'Radi u tvom pregledniku, potpuno neumreženo nakon pokretanja'
      },
      2: {
        title: 'Besplatan i otvorenog koda',
        description: 'Nema skrivenih programa za praćenje, svatko može vidjeti i doprinijeti kodu'
      }
    },
    section_whatitdoes: {
      title: 'Što radi?',
      subtitle: {
        main: '{0} ti pomaže pratiti vrijeme.',
        sub: 'Radi ili se odmori kad ti to kaže.'
      },
      cards: [
        {
          title: 'Rad',
          description: 'Vrijeme za obavljanje posla',
          duration: '25 minuta'
        },
        {
          title: 'Kratka pauza',
          description: 'Pogledaj video, pročitaj koji članak, popij kavu',
          duration: '5 do 15 minuta'
        },
        {
          title: 'Duga pauza',
          description: 'Odrijemaj ili idi u šetnju',
          duration: '15 minuta'
        }
      ],
      try_it: {
        base: 'Ako gledaš previše videa s mačkama umjesto da radiš, onda {0}.',
        try: 'ga isprobaj'
      }
    },
    faq: {
      title: 'ČPP',
      hint: 'Savjet',
      accordion: {
        change_timers: {
          q: 'Mogu li promijeniti te timere?',
          a: 'Da! Možeš promijeniti timere za rad, pauzu i dugu pauzu kako god želiš! Također možeš promijeniti učestalost dugih pauza!'
        },
        will_it_help: {
          q: 'Hoće li mi ovaj program pomoći?',
          a: 'Ovosi o tebi. Ovaj se program trudi stvoriti motivirajuće okruženje svojim čistim dizajnom i fleksibilnošću, ali ovisi o tebi hoćeš li slijediti raspored koji predlaže.',
          hint: 'Ako ne možeš raditi 25 minuta zaredom ili ako je pauza od 5 minuta prekratka, prilagodi postavke. Nemoj odustati, slijedi laganiji raspored i pooštri ga iz dana u dan.'
        },
        data_collection: {
          q: 'Je li program sakuplja podatke?',
          a: 'Ne! Program radi samo u tvom pregledniku, nikakvi se podaci ne prikupljaju niti šalju!'
        },
        remember_settings: {
          q: 'Kako će onda zapamtiti moje postavke?',
          a: 'Ovisi o tvom preglednik. Ako izbrišeš podatke preglednika, postavke programa će se također će se obnoviti na standardne vrijednosti.',
          hint: 'Ako želiš zadržati svoje postavke, nemoj koristiti program u privatnom načinu pregledavanja (inkognito).'
        },
        need_to_know: {
          q: 'Što moram znati za korištenje ovog programa?',
          a: 'Apsolutno ništa. Ako ne želiš ulaziti u postavke, jednostavno pokreni timer i pazi na zvučni signal kad završi. Kad je gotov, pokreni sljedeći timer kad si spreman/na. Za korištenje ovog timera nije potrebno nikakvo znanje, samo pazi na preostalo vrijeme!'
        },
        timer_style: {
          q: 'Koji timer koristiti?',
          a: 'To ovisi o tome kako želiš da se prikazuje timer. Tradicionalno se prikazuje kao „12:34” (sekunde-preciznost), približno kao „13 minuta”, a postotak kao „50 %”.'
        }
      }
    },
    section_features: {
      title: 'Popis značajki',
      list: {
        customization: 'Prilagođavanje',
        notifications: 'Zvuk i obavijesti',
        flexible: 'Fleksibilnost',
        pwa: 'Bezmrežni rad',
        opensource: 'Otvoren kod',
        notrackers: 'Bez programa za praćenje',
        noads: 'Bez reklama i skočnih prozora',
        clean: 'Clean design',
        adaptiveticking: 'Adaptivno otkucavanje',
        localization: 'Višejezičnost',
        darkmode: 'Tamni modus',
        more: '… i uskoro još više'
      }
    },
    support: {
      title: 'Podrži ovaj projekt',
      subtitle: {
        0: 'AnotherPomodoro se razvija kao sporedni projekt bez naknade.',
        1: {
          base: 'Ako smatraš da je ovaj projekt vrijedan podrške, {0}.',
          action: 'podrži ga'
        }
      },
      method: {
        github: 'Pogledaj GitHub stranicu',
        buymeacoffee: 'Kupi autoru kavu'
      },
      credits: 'Izrađen sa ❤. Autor: Imre Gera'
    }
  },
  setup: {
    head: 'Postavljanje',
    title: 'Postavimo najbitnije',
    startButton: 'Krenimo',
    steps: {
      language: {
        title: 'Jezik'
      },
      preset: {
        title: 'Unaprijed postavljene postavke programa',
        description: 'Ove unaprijed postavljene postavke omogućuju određene programske funkcije za ugodan osjećaj tijekom korištenja programa.'
      },
      timerpreset: {
        title: 'Trajanje timera',
        description: 'Odaberi unaprijed postavljenu postavku timera s kojom želiš raditi.'
      },
      timerstyle: {
        title: 'Prikaz timera',
        description: 'AnotherPomodoro podržava tri stila timera, od preciznosti u sekundama do prikaza postotka.'
      },
      permissions: {
        title: 'Dozvole',
        description: 'Program može odsvirati zvuk i poslati obavijest kad timer istekne.'
      },
      theme: {
        title: 'Tema',
        description: 'Upravljaj izgledom programa.'
      },
      tip: {
        title: 'Savjet',
        description: 'Sve postavke pronaći ćeš pritiskom na ikonu postavki u gornjem desnom kutu.'
      }
    },
    presets: {
      _values: {
        minimalist: 'Minimalne',
        default: 'Standardne',
        hardcore: 'Potpune'
      },
      _valueDescription: {
        minimalist: 'Bez elemenata koje ometaju, samo timer u sredini.',
        default: 'Početne postavke. Preporučuje se korisnicima koji program koriste po prvi puta.',
        hardcore: 'Sve funkcije su aktivirane tako da su nadohvat ruke.'
      }
    },
    permissions: {
      audio: 'Zvuk',
      notifications: 'Obavijesti'
    },
    theme: {
      _values: {
        light: 'Standardna',
        dark: 'Tamna'
      },
      _valueDescription: {
        light: 'Puno prijatnih boja',
        dark: 'Tamnija, jednaka produktivnost'
      }
    },
    preview: 'pregledaj'
  },
  section: {
    work: 'Rad',
    shortpause: 'Pauza',
    longpause: 'Duga pauza',
    wait: 'Čekanje'
  },
  controls: {
    play: 'Pokreni ili zaustavi timer',
    stop: 'Resetiraj timer',
    advance: 'Idi na sljedeći odjeljak'
  },
  settings: {
    heading: 'Postavke',
    tabs: {
      main: 'Glavne',
      timer: 'Raspored',
      display: 'Prikaz',
      audio: 'Zvuk',
      about: 'Informacije'
    },
    buttons: {
      close: 'Zatvori',
      reset: 'Resetiraj'
    },
    reset: {
      title: 'Resetiraj postavke',
      confirm: 'Resetiraj',
      cancel: 'Odustani'
    },
    scheduleMinTime: 'Najmanje dozvoljeno vrijeme je 5 sekundi',
    about: {
      madeby: 'Autor: Imre Gera',
      source: 'Izvorni kod',
      support: 'Podrži projekt',
      share: 'ili dijeli program na društvenim mrežama:'
    },
    values: {
      lang: {
        _title: 'Jezik',
        _description: '',
        _values: {
          en: 'English',
          hr: 'Hrvatski',
          hu: 'Magyar'
        },
        _valueDescription: {
          en: '',
          hr: '',
          hu: ''
        }
      },
      eventLoggingEnabled: {
        _title: 'Aktiviraj zapisivanje događaja u dnevnik',
        _description: ''
      },
      currentTimer: {
        _title: 'Stil timera',
        _description: '',
        _values: {
          traditional: 'Tradicionalo',
          approximate: 'Približno',
          percentage: 'Postotak'
        },
        _valueDescription: {
          traditional: '12:34',
          approximate: '13 minuta',
          percentage: '50 %'
        }
      },
      adaptiveTicking: {
        enabled: {
          _title: 'Aktiviraj adaptivno otkucavanje',
          _description: 'Timer će rjeđe otkucavati dok je u pozadini'
        }
      },
      schedule: {
        longPauseInterval: {
          _title: 'Interval duge pauze',
          _description: ''
        },
        numScheduleEntries: {
          _title: 'Broj unosa u rasporedu',
          _description: ''
        },
        visibility: {
          enabled: {
            _title: 'Prikaži raspored',
            _description: ''
          },
          showSectionType: {
            _title: 'Prikaži vrtu odjeljka u rasporedu',
            _description: 'Prikazuje trenutačnu vrstu odjeljka ispod rasporeda'
          }
        },
        lengths: {
          _title: 'Unaprijed postavljen raspored',
          _description: '',
          _values: {
            default: 'Standardni',
            debug: 'Otklanjanja grešaka',
            custom: 'Prilagođeni'
          },
          _valueDescription: {
            default: '25 minuta rada, 5 minuta pauze',
            debug: 'U svrhu otklanjanja grešaka',
            custom: 'Postavi kako želiš'
          },
          work: {
            _title: 'Rad',
            _description: ''
          },
          shortpause: {
            _title: 'Pauza',
            _description: ''
          },
          longpause: {
            _title: 'Duga pauza',
            _description: ''
          }
        }
      },
      performance: {
        showProgressBar: {
          _title: 'Prikaži traku napredovanja',
          _description: 'Prikaži napredovanje iza timera'
        }
      },
      permissions: {
        audio: {
          _title: 'Odsviraj zvuk',
          _description: 'Dozvoli programu odsvirati zvukove kad je jedan odjeljak gotov'
        },
        notifications: {
          _title: 'Dozvole za obavijesti',
          _description: 'Dozvoli programu slati obavijeti kad je jedan odjeljak gotov'
        }
      },
      audio: {
        volume: {
          _title: 'Glasnoća zvuka',
          _description: ''
        },
        soundSet: {
          _title: 'Postaljen zvuk',
          _description: 'Korišteni zvukovi za obavijesti',
          _values: {
            musical: 'Glazba'
          },
          _valueDescription: {
            musical: 'Standardni zvukovi'
          }
        }
      },
      timerControls: {
        enableKeyboardShortcuts: {
          _title: 'Aktiviraj tipkovne prečace',
          _description: 'Pokreni/zaustavi timer pomoću razmaknice'
        }
      },
      tasks: {
        enabled: {
          _title: 'Aktiviraj popis zadataka',
          _description: 'Upravljaj radom izravno u programu'
        },
        maxActiveTasks: {
          _title: 'Maksimalan broj prikazanih aktivnih zadataka',
          _description: 'Vidjet ćeš najviše ovoliko aktivnih zadataka'
        },
        removeCompletedTasks: {
          _title: 'Ukloni dovršene zadatke',
          _description: 'Dovršeni zadaci će se ukloniti kad započne novi odjeljak'
        }
      },
      pageTitle: {
        useTickEmoji: {
          _title: 'Koriti kvačicu u naslovu',
          _description: 'Prikaži ✔ umjeto „gotovo”'
        }
      },
      visuals: {
        darkMode: {
          _title: 'Aktiviraj tamni modus',
          _description: 'Tamnija, jednaka produktivnost'
        }
      },
      reset: {
        _title: 'Resetiraj postvke',
        _description: 'Sve postavke će se resetirati nakon ponovnog učitavanja programa'
      }
    }
  },
  notification: {
    action: {
      ready: 'Krenimo!'
    },
    work: {
      title: 'Vrijeme je da se vratiš na rad!',
      body: 'Tvoja je pauza gotova. Radi još malo više, a onda se opet odmori.'
    },
    shortpause: {
      title: 'Vrijeme je za pauzu',
      body: 'Baš lijepo, zaslužio/la si kratku pauzu.'
    },
    longpause: {
      title: 'Konačno! Više slobodnog vremena!',
      body: 'Nakon ovoliko rada, zaslužuješ dužu pauzu.'
    }
  },
  error: {
    format_invalid: 'Neispravan format unosa',
    range_invalid: 'Vrijednost mora biti između {min} i {max}',
    required: 'Ovo se polje mora ispuniti',
    numeric: 'Vrijednost mora biti broj',
    min: 'Vrijednost mora biti barem {min}',
    max: 'Vrijednost mora biti najviše {max}',
    time_format: 'Neispravno formatirano vrijeme (MM:SS)',
    min_time: 'Unos vremena je prekratak',
    undefined: 'Nedefinirana greška'
  },
  tasks: {
    title: 'Zadaci',
    empty: 'Još nema zadataka',
    manage: 'Upravljaj'
  },
  ready: 'Gotovo',
  errorpage: {
    title: {
      crash: 'Pregram je prekinuo rad',
      notfound: 'Ta stranica ne postoji',
      other: 'Dogodila se greška'
    },
    action: {
      reset: 'Resetiraj program',
      reload: 'Ponovo učitaj stranicu',
      home: 'Vrati se na početnu stranicu',
      githubIssue: 'Pošalji izvještaj o grešci',
      githubDiscussion: 'Pitaj druge imaju li isti problem',
      twitter: 'Napišite prijateljsku poruku'
    },
    showError: {
      main: 'Prikaži mi poruku greške!',
      sub: 'Koristit ću je za prijavljivanje problema ili ću pitati druge imaju li isti problem.'
    },
    suggestions: {
      primary: 'Možeš',
      secondary: 'ili ako ti nisu pomogli'
    }
  },

    timerpreset: {
      _values: {
        default: 'Standardne',
        easy: 'Početničke',
        advanced: 'Napredne',
        workaholic: 'Radoholičarske'
      },
      _valueDescription: {
        default: 'Standardne Pomodoro vrijednosti.',
        easy: 'Za one koji još nisu isprobali Pomodoro tehniku.',
        advanced: 'Radi malo učinkovitije.',
        workaholic: 'Za duge radne sesije.'
      },
      description: '{brief} \n {worklength} min rada s {splength} min kratkih {lplength} min dugih pauza nakon svakih {lpfreq} radnih sesija.'
  }
}
