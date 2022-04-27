const persistStores = ['settings', 'tasklist']

/** Get the persistence key of the store by its ID */
const getStorePersistenceKey = id => `persist-${id}`

/** Restore store to its persisted state (if there is such a state) */
function restoreStore (store) {
  const stateToRestore = localStorage.getItem(getStorePersistenceKey(store.$id))

  if (stateToRestore !== null) {
    store.$patch(JSON.parse(stateToRestore))
  }
}

function PiniaPersistPlugin ({ store }) {
  if (persistStores.includes(store.$id)) {
    // Restore the store first
    restoreStore(store)

    // Subscribe to changes and persist them
    const unsubscribe = store.$subscribe(() => {
      try {
        localStorage.setItem(getStorePersistenceKey(store.$id), JSON.stringify(store.$state))
      } catch (err) {
        // Failed to write to localStorage for some reason, unsubscribe persistence
        unsubscribe()
      }
    })
  }
}

const PiniaNuxtPlugin = ({ $pinia }) => {
  $pinia.use(PiniaPersistPlugin)
}

export default PiniaNuxtPlugin
