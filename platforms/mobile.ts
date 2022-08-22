import { useMobileSettings } from '~~/stores/platforms/mobileSettings'
import { useEvents, EventType } from '~~/stores/events'
import { useSettings } from '~~/stores/settings'
import { useSchedule } from '~~/stores/schedule'

interface FlutterJavascriptChannel {
  postMessage(message: string): void;
}

enum FlutterMessageType {
  clientReady = 'ready',
  setPadding = 'setPadding',
  showNotification = 'showNotification',
  appEvent = 'appEvent',
  tick = 'tick'
}

interface FlutterMessage {
  type: FlutterMessageType,
  payload: unknown
}

declare global {
  interface Window {
    NativeFramework?: FlutterJavascriptChannel
    Send?: (msg: FlutterMessage) => void
  }
}

export function useMobile () {
  const mobileSettingsStore = useMobileSettings()
  const eventsStore = useEvents()
  const settingsStore = useSettings()
  const scheduleStore = useSchedule()

  onMounted(() => {
    console.info('Mobile platform loaded')

    if (!window) {
      console.warn('Window does not exist, quitting')
      return
    }

    if (!window.NativeFramework) {
      console.warn('Native framework not found')
      return
    }

    window.Send = function (msg: FlutterMessage) {
      console.log(`Got: ${JSON.stringify(msg)}`)

      switch (msg.type) {
        case FlutterMessageType.setPadding:
          mobileSettingsStore.$patch({
            padding: msg.payload
          })

          break
      }
    }

    // register store watcher
    eventsStore.$subscribe(() => {
      window.NativeFramework.postMessage(JSON.stringify({
        type: FlutterMessageType.appEvent,
        payload: eventsStore.lastEvent
      } as FlutterMessage))

      if (eventsStore.lastEvent._event === EventType.TIMER_FINISH && settingsStore.mobile.notifications.sectionOver) {
        window.NativeFramework.postMessage(JSON.stringify({
          type: FlutterMessageType.showNotification,
          payload: {
            title: 'Hello',
            description: 'This is a test notification :)'
          }
        } as FlutterMessage))
      }
    })

    scheduleStore.$subscribe(() => {
      const currentItem = scheduleStore.getCurrentItem
      window.NativeFramework.postMessage(JSON.stringify({
        type: FlutterMessageType.tick,
        payload: {
          remaining_ms: currentItem.length - currentItem.timeElapsed,
          length_ms: currentItem.length
        }
      } as FlutterMessage))
    })

    window.NativeFramework.postMessage(JSON.stringify({ type: FlutterMessageType.clientReady } as FlutterMessage))
  })
}
