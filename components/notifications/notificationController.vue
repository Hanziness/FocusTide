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
      }
    }
  },

  mounted () {
    this.loadSoundSet('musical')

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
            volume: 0.9
          })
        }
      } catch (err) {
        console.warn(err)
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
            console.log('YAY! I was clicked!')
          }
        })
      } catch (err) {

      }
    }
  }
}
</script>
