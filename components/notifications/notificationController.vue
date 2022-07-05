<script>
import { mapStores } from 'pinia'
import { useSettings } from '~/stores/settings'
import { useSchedule } from '~/stores/schedule'
import { useNotifications } from '~/stores/notifications'
import { EventType, useEvents } from '~/stores/events'

export default {
  data () {
    return {
      currentSoundSet: null,
      sounds: {
        work: null,
        shortpause: null,
        longpause: null
      }
    }
  },

  computed: {
    ...mapStores(useSettings, useSchedule, useNotifications, useEvents),

    remainingTime () {
      return this.scheduleStore.getSchedule[0].timeElapsed
    },

    lastEvent () {
      const lastEventArray = this.eventsStore.events.slice(-1)
      return lastEventArray.length > 0 ? lastEventArray[0] : null
    }
  },

  watch: {
    remainingTime (newValue, oldValue) {
      // TODO update persistent notification (if enabled)
    },
    lastEvent (newValue, oldValue) {
      console.log(newValue)
      if (newValue._eventType === EventType.TIMER_FINISH) {
        this.showNotification(this.scheduleStore.getSchedule[1].type)
        console.log("Woohoo, timer's finished!")
      }
    }
  },

  created () {
    // // sound set watcher
    // this.storeUnwatch.soundSet = this.$store.watch(
    //   state => state.settings.audio.soundSet,
    //   (newValue) => {
    //     // load new sound set
    //     this.loadSoundSet(newValue)
    //   }
    // )

    // this.storeUnwatch.timerState = this.$store.watch(
    //   state => state.schedule.timerState,
    //   (newValue) => {
    //     // update volume of sounds
    //     if (newValue === 1) {
    //       this.loadSoundSet(this.$store.state.settings.audio.soundSet)
    //     }
    //   }
    // )
  },

  mounted () {
    // Register app started notification
    this.eventsStore.recordEvent(EventType.APP_STARTED)

    // check if timer is already running
    if (this.scheduleStore.timerState === 1) {
      this.loadSoundSet()
    }

    // Check Visibility and register in store
    if (window && window.document && 'hidden' in window.document) {
      const settingsStore = this.settingsStore
      window.document.addEventListener('visibilitychange', () => {
        settingsStore.registerNewHidden(window.document.hidden)
      }, false)

      // Commit this information immediately to make sure it's up to date
      this.settingsStore.registerNewHidden(window.document.hidden)
    } else {
      this.settingsStore.registerNewHidden(false)
    }

    // Check permissions
    this.notificationsStore.updateEnabled()
  },

  methods: {
    /**
     * Load a sound set into memory
     * @param {String} setName Name of the sound set to load
     */
    loadSoundSet (setName = this.settingsStore.audio.soundSet) {
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

      if (this.sounds[key] && this.settingsStore.permissions.audio) {
        this.sounds[key].source.volume = this.settingsStore.audio.volume
        this.sounds[key].source.play()
      }
    },

    /**
     * Show desktop notification (if possible) based on the next state.
     * @param {String} nextState The type of the next section
     */
    showNotification (nextState) {
      // TODO Firefox does not support actions
      if (window.Notification.permission !== 'granted' || this.settingsStore.permissions.notifications !== true) { return }
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
      // const nextScheduleType = nextType || this.scheduleStore.getSchedule[1].type
      // this.playSound(nextScheduleType)
      // this.showNotification(nextScheduleType)
    }
  },

  render () {
    return this.$scopedSlots.default({
      handleCompletion: this.handleCompletion
    })
  }
}
</script>
