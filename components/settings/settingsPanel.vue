<template>
  <section v-show="processedValue" class="settings-panel sm:w-full md:w-1/2 lg:w-2/5">
    <div class="settings-wrapper">
      <h1 class="title">
        <span>{{ $i18n.t('settings.heading') }}</span>
        <ui-button subtle class="float-right -mt-2 -mr-2" @click="processedValue = false">
          <close-icon :title="$i18n.t('settings.buttons.close')" />
        </ui-button>
      </h1>
      <div class="settings-panel-main">
        <div class="w-full">
          <transition tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
            <div v-if="activeTab === 1" :key="1" class="settings-tab">
              <settings-options
                :settings-key="['lang']"
                :values="{'en': 'en', 'hu': 'hu'}"
                :custom-value="$store.state.settings.lang ? $store.state.settings.lang : $i18n.locale"
              />
              <divider />
              <settings-check :settings-key="['adaptiveTicking', 'enabled']" />
              <settings-check :settings-key="['timerControls', 'enableKeyboardShortcuts']" />
              <divider />
              <settings-check :settings-key="['permissions', 'audio']" />
              <settings-check
                :settings-key="['permissions', 'notifications']"
                :set-value-on-change="false"
                :disabled="$store.state.notifications.enabled === false"
                :custom-set-function="changeNotificationSettings"
              />

              <divider />

              <settings-check :settings-key="['tasks', 'enabled']" />
              <settings-text
                :settings-key="['tasks', 'maxActiveTasks']"
                :min="1"
                numeric
                :disabled="!$store.state.settings.tasks.enabled"
              />
              <settings-check :settings-key="['tasks', 'removeCompletedTasks']" />

              <divider />

              <div :class="['reset-button', { 'active': resetConfirm }]" role="button" @click="resetConfirm = true">
                <span>
                  <span v-text="$i18n.t('settings.reset.title')" />
                  <span class="float-right"><reset-icon :size="28" /></span>
                </span>
                <transition name="transition-fade">
                  <div v-if="resetConfirm" class="left-0 top-0 absolute w-full h-full grid grid-flow-col grid-cols-2 items-stretch">
                    <div class="reset-subbutton" @click.stop="triggerSettingsReset" v-text="$i18n.t('settings.reset.confirm')" />
                    <div class="reset-subbutton" @click.stop="resetConfirm = false" v-text="$i18n.t('settings.reset.cancel')" />
                  </div>
                </transition>
              </div>
            </div>

            <div v-if="activeTab === 2" :key="2" class="settings-tab">
              <settings-text :settings-key="['schedule', 'longPauseInterval']" :min="1" numeric />
              <divider />
              <settings-options
                :settings-key="['schedule', 'lengths']"
                :custom-value="$store.getters['settings/getActiveSchedulePreset']"
                :values="timerPresets"
                :set-value-on-change="false"
                :custom-set-function="(v) => { $store.commit('settings/applyPreset', v) }"
              />
              <settings-time :settings-key="['schedule', 'lengths', 'work']" />
              <settings-time :settings-key="['schedule', 'lengths', 'shortpause']" />
              <settings-time :settings-key="['schedule', 'lengths', 'longpause']" />
            </div>

            <div v-if="activeTab === 3" :key="3" class="settings-tab">
              <settings-check :settings-key="['visuals', 'darkMode']" />
              <divider />
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
              <settings-check :settings-key="['pageTitle', 'useTickEmoji']" />
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
    </div>
  </section>
</template>

<script>
import ResetIcon from 'vue-material-design-icons/AlertCircle.vue'
import { timerPresets } from '@/store/settings'

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
    CloseIcon: () => import(/* webpackMode: "eager" */ 'vue-material-design-icons/Close.vue'),
    ResetIcon
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      activeTab: 1,
      resetConfirm: false,
      timerPresets
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
    },

    triggerSettingsReset () {
      this.$store.dispatch('settings/resetSettings')
      window.localStorage.clear()
      // this.$router.go()
      window.location.reload()
    }
  }
}
</script>

<style lang="scss">
section.settings-panel {
  & input {
    @apply rounded-md border-gray-300 bg-gray-100 focus:bg-white focus:ring-primary;
    @apply dark:bg-gray-800 dark:focus:bg-gray-600 dark:text-gray-100 dark:border-gray-700;
    @apply transition-colors;
  }

  & input[type="checkbox"] {
    @apply text-primary;

    &:hover {
      @apply dark:bg-gray-500 bg-gray-200;
    }

    &:checked {
      @apply dark:bg-primary dark:border-primary;

      &:hover {
        background-color: scale-color(#3498db, $lightness: 30%);
      }
    }
  }
}
</style>

<style lang="scss" scoped>
section.settings-panel {
  @apply h-full fixed w-2/5 p-0 md:p-4;

  z-index: 1001;
  min-width: calc(min(600px, 100%));

  div.settings-wrapper {
    @apply flex flex-col h-full rounded-none md:rounded-lg overflow-hidden shadow-lg;
    @apply bg-white dark:bg-gray-900 dark:text-gray-50;

    div.settings-panel-main {
      @apply px-4 flex-grow overflow-y-auto pb-2;
    }
  }
}

.title {
  @apply px-4 text-xl mt-4 mb-3 uppercase font-bold;
}

div.settings-panel-menubar {
  @apply flex-none h-20 flex flex-row p-4;
}

div.tab-header {
  @apply flex-1 h-full bg-gray-200 p-2 cursor-pointer text-center flex items-center justify-center select-none rounded-lg;
  @apply dark:bg-gray-800;

  transition: border-color 0.2s ease-out;
  box-sizing: border-box;

  &.active {
    @apply bg-primary text-white;
  }

  &:not(:first-of-type) {
    @apply ml-1;
  }

  &:not(:last-of-type) {
    @apply mr-1;
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

div.reset-button {
  @apply w-full p-4 text-black bg-gray-200 text-lg cursor-pointer transition-colors rounded-lg relative;
  @apply dark:bg-gray-700 dark:text-gray-50;

  &:hover:not(.active) {
    @apply bg-red-500 text-white;
    @apply dark:bg-red-700;
  }

  &:active {
    @apply bg-red-600 text-white;
    @apply dark:bg-red-800;
  }

  &.active {
    @apply bg-gray-200 text-black dark:bg-gray-600 dark:text-white cursor-default;
  }

  & .reset-subbutton {
    @apply m-2 rounded-lg flex justify-center items-center cursor-pointer;

    &:first-child {
      @apply mr-1 bg-red-600 hover:bg-red-700 text-white;
    }

    &:last-child {
      @apply ml-1 bg-white hover:bg-gray-100 text-black;
    }
  }
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
