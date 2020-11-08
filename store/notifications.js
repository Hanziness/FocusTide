export const state = () => {
  return {
    enabled: undefined
  }
}

export const mutations = {
  updateEnabled (state, manualValue = undefined) {
    if (manualValue !== undefined) {
      state.enabled = manualValue
      return
    }

    if (window && window.Notification) {
      const permissions = window.Notification.permission
      if (permissions === 'default') {
        state.enabled = null
      } else if (permissions === 'granted') {
        state.enabled = true
      } else {
        state.enabled = false
      }
    } else {
      state.enabled = false
    }
  }
}
