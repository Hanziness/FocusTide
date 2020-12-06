<script>
export default {
  data () {
    return {
      currentSoundSet: null,
      sounds: {
        work: null,
        shortpause: null,
        longpause: null
      },
      storeUnwatch: {
        volume: null,
        soundSet: null,
        timerState: null
      }
    }
  },

  created () {
    // volume watcher
    this.storeUnwatch.volume = this.$store.watch(
      state => state.settings.audio.volume,
      (newValue) => {
        // update volume of sounds
        for (const key in this.sounds) {
          this.sounds[key].source.volume = newValue
        }
      }
    )

    // sound set watcher
    this.storeUnwatch.soundSet = this.$store.watch(
      state => state.settings.audio.soundSet,
      (newValue) => {
        // load new sound set
        this.loadSoundSet(newValue)
      }
    )

    this.storeUnwatch.timerState = this.$store.watch(
      state => state.schedule.timerState,
      (newValue) => {
        // update volume of sounds
        if (newValue === 1) {
          this.loadSoundSet(this.$store.state.settings.audio.soundSet)
        }
      }
    )
  },

  beforeDestroy () {
    // de-register store watchers
    for (const key in this.storeUnwatch) {
      if (this.storeUnwatch[key]) {
        this.storeUnwatch[key]()
      }
    }
  },

  mounted () {
    // check if timer is already running
    if (this.$store.state.schedule.timerState === 1) {
      this.loadSoundSet()
    }

    // Check Visibility and register in store
    if (window && window.document && 'hidden' in window.document) {
      const storeRef = this.$store
      window.document.addEventListener('visibilitychange', () => {
        storeRef.commit('settings/registerNewHidden', window.document.hidden)
      }, false)

      // Commit this information immediately to make sure it's up to date
      storeRef.commit('settings/registerNewHidden', window.document.hidden)
    } else {
      this.$store.commit('settings/registerNewHidden', null)
    }

    // Check permissions
    this.$store.commit('notifications/updateEnabled')
  },

  methods: {
    /**
     * Load a sound set into memory
     * @param {String} setName Name of the sound set to load
     */
    loadSoundSet (setName = this.$store.state.settings.audio.soundSet) {
      if (this.currentSoundSet === setName) { return }

      try {
        for (const key in this.sounds) {
          this.sounds[key] = {
            source: new Audio(`/audio/${setName}/${key}.mp3`),
            ready: false
          }

          const thisRef = this
          this.sounds[key].source.addEventListener('canplay', (event) => {
            thisRef.sounds[key].ready = true
          })
        }

        this.currentSoundSet = setName
      } catch (err) {
        // console.warn(err)
      }
    },

    /**
     * Play the specified sound
     * @param {String} key The key of the sound. Valid values are `work`, `pause` and `longpause`.
     */
    playSound (key) {
      // load sound set if not already loaded
      if (!this.currentSoundSet) {
        this.loadSoundSet()
      }

      if (this.sounds[key] && this.$store.state.settings.permissions.audio) {
        this.sounds[key].source.play()
      }
    },

    /**
     * Show desktop notification (if possible) based on the next state.
     * @param {String} nextState The type of the next section
     */
    showNotification (nextState) {
      // TODO Firefox does not support actions
      if (window.Notification.permission !== 'granted' || this.$store.state.settings.permissions.notifications !== true) { return }
      const notificationActions = []
      if (nextState === 'work') {
        notificationActions.push({
          action: 'ready',
          title: this.$i18n.t('notification.action.ready')
        })
      }

      try {
        this.$notification.show(this.$i18n.t('notification.' + nextState + '.title'), {
          tag: 'AnotherPomodoro-SectionNotify',
          body: this.$i18n.t('notification.' + nextState + '.body'),
          actions: notificationActions
        }, {
          onclick () {
            // console.log('YAY! I was clicked!')
          }
        })
      } catch (err) {

      }
    },

    handleCompletion (nextType = undefined) {
      const nextScheduleType = nextType || this.$store.getters['schedule/getSchedule'][1].type
      this.playSound(nextScheduleType)
      this.showNotification(nextScheduleType)
    }
  },

  render () {
    return this.$scopedSlots.default({
      handleCompletion: this.handleCompletion
    })
  }
}
</script>
