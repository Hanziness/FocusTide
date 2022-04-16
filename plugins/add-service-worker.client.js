export default function () {
  if (process.env.NEW_SERVICE_WORKER && !process.server && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    })
  }
}
