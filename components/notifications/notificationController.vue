<template>
  <!-- <v-btn @click="playSound('work')">
    Play Work
  </v-btn> -->
  <div id="pomodoro-notification-handler" />
</template>

<script>
// import { Howl } from 'howler'
import { functionUpdateGroup } from '@/store/timer'

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
    this.loadSoundSet(this.$store.state.settings.audio.soundSet)

    const thisRef = this
    this.$store.commit('timer/subscribeToNotify', {
      fn (state) {
        const nextScheduleType = thisRef.$store.getters['events/getSchedule'][1]._type
        thisRef.playSound(nextScheduleType)
        thisRef.showNotification(nextScheduleType)
      },
      id: 'notification-sound',
      functionGroup: functionUpdateGroup.COMPLETE
    })
  },

  methods: {
    loadSoundSet (setName) {
      try {
        for (const key in this.sounds) {
          this.sounds[key] = new this.$notifications.Howl({
            src: `/audio/${setName}/${key}.mp3`,
            loop: false,
            autoplay: false,
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
    }
  }
}
</script>
