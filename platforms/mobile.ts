interface FlutterJavascriptChannel {
  postMessage(message: string): void;
}

declare global {
  interface Window {
    NativeFramework?: FlutterJavascriptChannel
  }
}

export function useMobile () {
  console.info('Mobile platform loaded')

  if (!window.NativeFramework) {
    console.warn('Native framework not found')
    return
  }

  console.log(window.NativeFramework)
  window.NativeFramework.postMessage('Hola')
}
