import { useMobileSettings } from '~~/stores/platforms/mobileSettings'

interface FlutterJavascriptChannel {
  postMessage(message: string): void;
}

enum FlutterMessageType {
  setPadding = 'setPadding'
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

  console.info('Mobile platform loaded')

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

  window.NativeFramework.postMessage('Hola')
}
