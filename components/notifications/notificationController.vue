<script>
export default {
  data () {
    return {
      sounds: {
        work: null,
        shortpause: null,
        longpause: null
      },
      storeUnwatch: {
        volume: null,
        soundSet: null
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
          this.sounds[key].volume(newValue)
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
    // TODO Due to Chrome restrictions, this will trigger warnings that
    // Howler cannot create the audio context until an interaction has
    // been made. Try to only initialize the sounds when the user starts
    // the timer.
    this.loadSoundSet(this.$store.state.settings.audio.soundSet)

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
    loadSoundSet (setName) {
      try {
        for (const key in this.sounds) {
          this.sounds[key] = new this.$notifications.Howl({
            src: `/audio/${setName}/${key}.mp3`,
            loop: false,
            autoplay: false,
            preload: true,
            volume: this.$store.state.settings.audio.volume
          })
        }
      } catch (err) {
        // console.warn(err)
      }
    },

    playSound (key) {
      if (this.sounds[key] && this.$store.state.settings.permissions.audio) {
        this.sounds[key].play()
      }
    },

    showNotification (nextState) {
      // TODO Firefox does not support actions
      if (window.Notification.permission !== 'granted') { return }
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
