import { defineNuxtPlugin, useRouter } from '#app'
import { useMain, flags } from '~~/stores/index'

const persistStores = ['settings', 'tasklist', 'tutorials']
const storeResetKey = '--reset-store'

/** Get the persistence key of the store by its ID */
const getStorePersistenceKey = id => `persist-${id}`

/** Restore store to its persisted state (if there is such a state) */
function restoreStore (store) {
  const stateToRestore = JSON.parse(localStorage.getItem(getStorePersistenceKey(store.$id)))

  if (stateToRestore !== null) {
    store.$patch(stateToRestore)

    console.log(`Restoring ${store.$id}`)
    const mainStore = useMain()
    mainStore.registerFlag(flags.STORE_RESTORED)
  }
}

export default defineNuxtPlugin(({ $pinia }) => {
  const router = useRouter()
  const PiniaPersistPlugin = ({ store }) => {
    if (persistStores.includes(store.$id)) {
      const restore = localStorage.getItem(storeResetKey) == null

      // Restore the store first
      if (restore) {
        restoreStore(store)
      }

      const changeSubscription = () => {
        // Subscribe to changes and persist them
        const unsubscribe = store.$subscribe(() => {
          try {
            if (store.$id === 'settings') {
              if (store.$state.reset) {
                // if the settings store is in reset state, set store reset key
                localStorage.setItem(storeResetKey, '1')
              } else {
                // otherwise remove the reset key
                localStorage.removeItem(storeResetKey)
              }
            }

            // otherwise persist store
            localStorage.setItem(
              getStorePersistenceKey(store.$id),
              JSON.stringify(store.$state)
            )
          } catch (err) {
            console.log(err)
            // Failed to write to localStorage for some reason, unsubscribe persistence
            unsubscribe()
          }
        })
      }

      // `afterEach` is used as a workaround to Pinia subscribers disappearing on navigation
      changeSubscription()
      router.afterEach(changeSubscription)
    }
  }

  $pinia.use(PiniaPersistPlugin)
})
