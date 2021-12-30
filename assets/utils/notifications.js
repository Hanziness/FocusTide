/** Asks for notification permissions from the browser and returns the permission value. Only
 * asks for permissions if the current permission state is `default` (ie. the user hasn't yet been
 * asked).
 * @returns `null` if the Notifications API is not available (there is no `Notification` object) or
 * the permission value (`default`, `granted` or `denied`).
 */
export async function getNotificationPermissions () {
  if (!Notification) { return null }
  if (Notification.permission !== 'default') {
    return Notification.permission
  }

  const permission = await Notification.requestPermission().then((permission) => {
    return permission
  }).catch((rejectreason) => {
    return 'denied'
  })

  return permission
}
