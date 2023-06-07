import { defineNuxtPlugin, useRouter } from '#app'
import { PiniaPluginContext, Store } from 'pinia'
import { useMain, flags } from '~~/stores/main'

interface BreakingChange {
  from?: string,
  to: string,
  reason: string[],
  affectedStores: string[]
}

const breakingChanges: BreakingChange[] = [
  {
    from: '1.0.0',
    to: '1.3.0',
    reason: [
      'Timer theme colours are now stored in a different way, restoring previous settings would cause the app to not have colours.'
    ],
    affectedStores: ['settings']
  },
  {
    from: '1.0.0',
    to: '1.4.0',
    reason: [
      'The settings\' theming data was restructured.'
    ],
    affectedStores: ['settings']
  },
  {
    from: '1.0.0',
    to: '1.4.1',
    reason: [
      'The app was rebranded to FocusTide.'
    ],
    affectedStores: ['tutorials']
  }
]

const persistStores = ['settings', 'tasklist', 'tutorials', 'main']
const storeResetKey = '--reset-store'

/** Get the persistence key of the store by its ID */
const getStorePersistenceKey = (id: string) => `persist-${id}`

/** Returns stores and reasons why they cannot be restored from previous versions
 * @example { settings: ['Something changed lately'] }
 */
function getBlockedStores (): Record<string, string[]> {
  const mainStore = localStorage.getItem(getStorePersistenceKey('main'))
  let previousVersion = '0.0.0'
  if (mainStore !== null) {
    const mainStoreParsed = JSON.parse(mainStore)

    previousVersion = mainStoreParsed.version
  }

  return persistStores.reduce((affectedStores, storeId) => {
    const storeExists = localStorage.getItem(getStorePersistenceKey(storeId)) !== null
    const breakingChangeIndex = breakingChanges.findIndex(breakingChange => breakingChange.affectedStores.includes(storeId) && breakingChange.to > previousVersion)

    if (storeExists && breakingChangeIndex >= 0) {
      affectedStores[storeId] = breakingChanges[breakingChangeIndex].reason
    }

    return affectedStores
  }, {} as Record<string, string[]>)
}

/** Restore store to its persisted state (if there is such a state) */
function restoreStore (store: Store) {
  const lsStore = localStorage.getItem(getStorePersistenceKey(store.$id))
  if (store === null) {
    return
  }

  const stateToRestore = JSON.parse(lsStore as string)

  if (stateToRestore !== null) {
    onMounted(() => {
      store.$patch(stateToRestore)
    })

    const mainStore = useMain()
    mainStore.registerFlag(flags.STORE_RESTORED)
    mainStore.restoredStores.push(store.$id)
  }
}

export default defineNuxtPlugin(({ $pinia }) => {
  const router = useRouter()
  const blockedStores = getBlockedStores()
  //

  const PiniaPersistPlugin = ({ store }: PiniaPluginContext) => {
    // if (store.$id === 'main') {
    //   store.$patch({
    //     skippedStores: blockedStores
    //   })
    // }

    if (persistStores.includes(store.$id)) {
      const restore = localStorage.getItem(storeResetKey) == null

      // Restore the store first if it's not the main store (that contains the version number)
      if (restore && store.$id !== 'main') {
        // Check if the store can be restored
        if (Object.keys(blockedStores).includes(store.$id)) {
          console.warn(`Store '${store.$id}' was not be restored due to breaking changes that happened since the last app update: \n - ${blockedStores[store.$id].join('\n - ')}`)
        } else {
          restoreStore(store)
        }
      }

      const changeSubscription = () => {
        // Write initial state to storage
        localStorage.setItem(
          getStorePersistenceKey(store.$id),
          JSON.stringify(store.$state)
        )

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
