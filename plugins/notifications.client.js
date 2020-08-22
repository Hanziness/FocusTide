import Vue from 'vue'
import VueNativeNotification from 'vue-native-notification'
import { Howl, Howler } from 'howler'

Vue.use(VueNativeNotification, {
  // defaults to true
  requestOnNotify: false
})

const Notifications = {
  Howl,
  Howler
}

export default function (context, inject) {
  inject('notifications', Notifications)
}
