import { useMobileSettings } from '~~/stores/platforms/mobileSettings'
import { useEvents, EventType } from '~~/stores/events'

interface FlutterJavascriptChannel {
  postMessage(message: string): void;
}

enum FlutterMessageType {
  clientReady = 'ready',
  setPadding = 'setPadding',
  showNotification = 'showNotification',
  appEvent = 'appEvent'
}

interface FlutterMessage {
  type: FlutterMessageType,
  payload: unknown
}

declare global {
  interface Window {
    NativeFramework?: FlutterJavascriptChannel
  }
}

export function useMobile () {
  const mobileSettingsStore = useMobileSettings()
  const eventsStore = useEvents()

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

      if (eventsStore.lastEvent._event === EventType.TIMER_FINISH) {
        window.NativeFramework.postMessage(JSON.stringify({
          type: FlutterMessageType.showNotification,
          payload: {
            title: 'Hello',
            description: 'This is a test notification :)'
          }
        } as FlutterMessage))
      }
    })

    window.NativeFramework.postMessage(JSON.stringify({ type: FlutterMessageType.clientReady } as FlutterMessage))
  })
}
