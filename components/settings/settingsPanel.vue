<template>
  <transition name="settings">
    <section v-show="processedValue" class="settings-panel sm:w-full md:w-1/2 lg:w-2/5">
      <div class="settings-panel-main">
        <h1 class="text-xl my-3">
          {{ $i18n.t('settings.heading') }}
          <ui-button subtle class="float-right -mt-1 -mr-2" @click="processedValue = false">
            <close-icon :title="$i18n.t('settings.buttons.close')" />
          </ui-button>
        </h1>
        <div class="w-full">
          <transition tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
            <div v-if="activeTab === 1" :key="1" class="settings-tab">
              <settings-options
                :settings-key="['lang']"
                :values="{'en': 'en', 'hu': 'hu'}"
              />
              <divider />
              <settings-check :settings-key="['adaptiveTicking', 'enabled']" />
              <divider />
              <settings-check :settings-key="['permissions', 'audio']" />
              <settings-check
                :settings-key="['permissions', 'notifications']"
                :set-value-on-change="false"
                :disabled="$store.state.notifications.enabled === false"
                :custom-set-function="changeNotificationSettings"
              />
            </div>

            <div v-if="activeTab === 2" :key="2" class="settings-tab">
              <settings-check :settings-key="['performance', 'showProgressBar']" />
              <settings-text :settings-key="['schedule', 'longPauseInterval']" :min="1" numeric />
              <divider />
              <settings-options
                :settings-key="['schedule', 'lengths']"
                :custom-value="$store.getters['settings/getActiveSchedulePreset']"
                :values="$store.state.settings.timerPresets"
                :set-value-on-change="false"
                :custom-set-function="(v) => { $store.commit('settings/applyPreset', v) }"
              />
              <settings-time :settings-key="['schedule', 'lengths', 'work']" />
              <settings-time :settings-key="['schedule', 'lengths', 'shortpause']" />
              <settings-time :settings-key="['schedule', 'lengths', 'longpause']" />
            </div>

            <div v-if="activeTab === 3" :key="3" class="settings-tab">
              <settings-options :settings-key="['currentTimer']" :values="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" />
              <divider />
              <settings-check :settings-key="['schedule', 'visibility', 'enabled']" />
              <settings-check :settings-key="['schedule', 'visibility', 'showSectionType']" :disabled="!$store.state.settings.schedule.visibility.enabled" />
              <settings-text
                :settings-key="['schedule', 'numScheduleEntries']"
                :min="3"
                :max="10"
                :disabled="!$store.state.settings.schedule.visibility.enabled"
                numeric
              />
              <divider />
              <settings-check :settings-key="['performance', 'showProgressBar']" />
              <!-- TODO Audio volume control -->
            </div>
          </transition>
        </div>
      </div>
      <div class="settings-panel-menubar">
        <div class="tab-header" :class="[{'active': activeTab === 1}]" @click="activeTab = 1">
          <span>{{ $i18n.t('settings.tabs.main') }}</span>
        </div>
        <div class="tab-header" :class="[{'active': activeTab === 2}]" @click="activeTab = 2">
          <span>{{ $i18n.t('settings.tabs.timer') }}</span>
        </div>
        <div class="tab-header" :class="[{'active': activeTab === 3}]" @click="activeTab = 3">
          <span>{{ $i18n.t('settings.tabs.display') }}</span>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'SettingsPanel',
  components: {
    // UiOverlay: () => import('@/components/base/overlay.vue'),
    UiButton: () => import(/* webpackChunkName: "uibase" */ '@/components/base/button.vue'),
    SettingsCheck: () => import(/* webpackMode: "eager" */ '@/components/settings/items/settingsCheck.vue'),
    SettingsText: () => import(/* webpackMode: "eager" */ '@/components/settings/items/settingsText.vue'),
    SettingsTime: () => import(/* webpackMode: "eager" */ '@/components/settings/items/settingsTime.vue'),
    SettingsOptions: () => import(/* webpackMode: "eager" */ '@/components/settings/items/settingsOptions.vue'),
    Divider: () => import(/* webpackMode: "eager" */ '@/components/base/divider.vue'),
    CloseIcon: () => import(/* webpackMode: "eager" */ 'vue-material-design-icons/Close.vue')
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      activeTab: 1
    }
  },

  computed: {
    processedValue: {
      get () { return this.value },
      set (newValue) { this.$emit('input', newValue) }
    },

    notificationPermission: {
      get () {
        return Notification ? (Notification.permission === 'granted' && this.$store.state.settings.permissions.notifications) : false
      },
      set (newValue) {
        if (Notification.permission === 'default') {
          const thisRef = this
          this.$notification.requestPermission().then((newValue) => {
            if (newValue === 'granted') {
              thisRef.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: true })
            } else {
              thisRef.notificationsBlocked = true
              thisRef.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: false })
            }

            thisRef.$store.commit('notifications/updateEnabled', newValue === 'granted')
          })
        } else if (Notification.permission === 'granted') {
          this.$store.commit('settings/SET', { key: ['permissions', 'notifications'], value: newValue })
        }
      }
    }
  },

  methods: {
    changeNotificationSettings (newValue) {
      this.notificationPermission = newValue
    }
  }
}
</script>

<style lang="scss">
section.settings-panel {
  & input {
    @apply rounded-md border-gray-300 bg-gray-100 focus:bg-white focus:ring-primary;
  }

  & input[type="checkbox"] {
    @apply text-primary;
  }
}
</style>

<style lang="scss" scoped>
section.settings-panel {
  @apply bg-white h-full fixed shadow w-2/5 flex flex-col;

  z-index: 1001;
  min-width: calc(min(600px, 100%));
}

div.settings-panel-main {
  @apply px-4 flex-grow overflow-y-auto;
}

div.settings-panel-menubar {
  @apply flex-none h-12 flex flex-row;
}

div.tab-header {
  @apply flex-1 h-full bg-gray-200 p-2 cursor-pointer text-center flex items-center justify-center select-none;

  transition: border-color 0.2s ease-out;
  box-sizing: border-box;

  &.active {
    @apply bg-primary text-white;
  }
}

div.settings-tab {
  @apply grid grid-cols-1 gap-2;
}

// ===== TAB TRANSITIONS =====
.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  // transition: opacity 0.5s ease-out;
  position: relative;
}

.tab-transition-enter {
  transform: translateY(10px);
  opacity: 0;
}

.tab-transition-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

// ===== CLOSE BUTTON =====
.button-close {
  @apply p-2 rounded-full -mt-1 -mr-1;

  transition: background-color 200ms ease-out;

  &:hover {
    @apply bg-gray-200;
  }

  &:active {
    @apply bg-gray-400;
  }
}
</style>
