import { reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'
import { useNotifications } from '~~/stores/notifications'
import { EventType, useEvents } from '~~/stores/events'

export function useWeb () {
  const settingsStore = useSettings()
  const scheduleStore = useSchedule()
  const notificationsStore = useNotifications()
  const eventsStore = useEvents()
  const i18n = useI18n()

  const state = reactive({
    currentSoundSet: null,
    sounds: {
      work: null,
      shortpause: null,
      longpause: null
    }
  })

  // TODO (??) This is elapsed time!
  // const remainingTime = computed(() => scheduleStore.getSchedule[0].timeElapsed)

  const lastEvent = computed(() => {
    const lastEventArray = eventsStore.events.slice(-1)
    return lastEventArray.length > 0 ? lastEventArray[0] : null
  })

  // watch(remainingTime, (newValue, oldValue) => {
  //   // TODO update persistent notification (if enabled)
  // })

  watch(lastEvent, (newValue) => {
    if (newValue._event === EventType.TIMER_FINISH) {
      showNotification(scheduleStore.getSchedule[1].type)
    }
  })

  eventsStore.$subscribe(() => {
    if (eventsStore.lastEvent._event === EventType.NOTIFICATIONS_ENABLED && window.Notification && window.Notification.permission === 'default') {
      window.Notification.requestPermission().then((newNotificationPermission) => {
        settingsStore.$patch({
          permissions: {
            notifications: newNotificationPermission === 'granted'
          }
        })
      })
    }
  })

  onMounted(() => {
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

    // Register app started notification
    eventsStore.recordEvent(EventType.APP_STARTED)

    // check if timer is already running
    if (scheduleStore.timerState === 1) {
      loadSoundSet()
    }

    // Check Visibility and register in store
    if (window && window.document && 'hidden' in window.document) {
      window.document.addEventListener('visibilitychange', () => {
        settingsStore.registerNewHidden(window.document.hidden)
      }, false)

      // Commit this information immediately to make sure it's up to date
      settingsStore.registerNewHidden(window.document.hidden)
    } else {
      settingsStore.registerNewHidden(false)
    }

    // Check permissions
    notificationsStore.updateEnabled()
  })

  /**
  * Load a sound set into memory
  * @param {String} setName Name of the sound set to load
  */
  const loadSoundSet = (setName = settingsStore.audio.soundSet) => {
    if (state.currentSoundSet === setName) { return }

    try {
      for (const key in state.sounds) {
        state.sounds[key] = {
          source: new Audio(`/audio/${setName}/${key}.mp3`),
          ready: false
        }

        state.sounds[key].source.addEventListener('canplay', () => {
          state.sounds[key].ready = true
        })
      }

      state.currentSoundSet = setName
    } catch (err) {
      // console.warn(err)
    }
  }

  /**
   * Play the specified sound
   * @param {String} key The key of the sound. Valid values are `work`, `pause` and `longpause`.
   */
  const playSound = (key: string) => {
    // load sound set if not already loaded
    if (!state.currentSoundSet) {
      loadSoundSet()
    }

    if (state.sounds[key] && settingsStore.permissions.audio) {
      state.sounds[key].source.volume = settingsStore.audio.volume
      state.sounds[key].source.play()
    }
  }

  const showNotification = (nextState: string) => {
    playSound(nextState)

    // TODO Firefox does not support actions
    if (window.Notification.permission !== 'granted' || settingsStore.permissions.notifications !== true) { return }
    const notificationActions : NotificationAction[] = []
    if (nextState === 'work') {
      notificationActions.push({
        action: 'ready',
        title: i18n.t('notification.action.ready')
      })
    }

    try {
      new Notification(i18n.t('notification.' + nextState + '.title'), {
        tag: 'AnotherPomodoro-SectionNotify',
        body: i18n.t('notification.' + nextState + '.body'),
        actions: notificationActions
      })
    } catch (err) {
      console.warn(err)
    }
  }
}
