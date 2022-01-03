<template>
  <section v-show="processedValue" class="h-full fixed p-0 md:p-4 w-full z-40 md:max-w-screen-sm">
    <div class="flex flex-col h-full rounded-none md:rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-900 dark:text-gray-50">
      <h1 class="px-4 text-xl mt-4 mb-2 uppercase font-bold">
        <span>{{ $i18n.t('settings.heading') }}</span>
        <UiButton subtle class="float-right -mt-2 -mr-2" @click="processedValue = false">
          <CloseIcon :title="$i18n.t('settings.buttons.close')" />
        </UiButton>
      </h1>
      <div class="px-4 flex-grow overflow-y-auto py-2">
        <div class="w-full">
          <Transition tag="div" name="tab-transition" mode="out-in" class="overflow-hidden w-full relative">
            <div v-if="activeTab === 1" :key="1" class="settings-tab">
              <SettingsOptions
                :settings-key="['lang']"
                :values="{'en': 'en', 'hu': 'hu'}"
                :custom-value="$store.state.settings.lang ? $store.state.settings.lang : $i18n.locale"
              />
              <Divider />
              <SettingsCheck :settings-key="['adaptiveTicking', 'enabled']" />
              <SettingsCheck :settings-key="['timerControls', 'enableKeyboardShortcuts']" />
              <Divider />
              <SettingsCheck :settings-key="['permissions', 'audio']" />
              <SettingsCheck
                :settings-key="['permissions', 'notifications']"
                :set-value-on-change="false"
                :disabled="$store.state.notifications.enabled === false"
                :custom-set-function="changeNotificationSettings"
              />

              <Divider />

              <SettingsCheck :settings-key="['tasks', 'enabled']" />
              <SettingsText
                :settings-key="['tasks', 'maxActiveTasks']"
                :min="1"
                numeric
                :disabled="!$store.state.settings.tasks.enabled"
              />
              <SettingsCheck :settings-key="['tasks', 'removeCompletedTasks']" :disabled="!$store.state.settings.tasks.enabled" />

              <Divider />

              <SettingsCheck :settings-key="['reset']" />
            </div>

            <div v-else-if="activeTab === 2" :key="2" class="settings-tab">
              <SettingsText :settings-key="['schedule', 'longPauseInterval']" :min="1" numeric />
              <Divider />

              <SettingsOptions
                :settings-key="['schedule', 'lengths']"
                :custom-value="$store.getters['settings/getActiveSchedulePreset']"
                :values="timerPresets"
                :set-value-on-change="false"
                :custom-set-function="(v) => { $store.commit('settings/applyPreset', v) }"
              />
              <SettingsTime :settings-key="['schedule', 'lengths', 'work']" :min-ms="5000" />
              <SettingsTime :settings-key="['schedule', 'lengths', 'shortpause']" :min-ms="5000" />
              <SettingsTime :settings-key="['schedule', 'lengths', 'longpause']" :min-ms="5000" />
              <div class="rounded-lg ring-inset ring ring-blue-400 bg-blue-100 dark:bg-gray-700 dark:text-gray-100 px-3 py-4 flex flex-row items-center space-x-2">
                <InfoIcon />
                <span v-text="$i18n.t('settings.scheduleMinTime')" />
              </div>
            </div>

            <div v-else-if="activeTab === 3" :key="3" class="settings-tab">
              <SettingsCheck :settings-key="['visuals', 'darkMode']" />
              <Divider />
              <SettingsOptions :settings-key="['currentTimer']" :values="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" />
              <Divider />
              <SettingsCheck :settings-key="['schedule', 'visibility', 'enabled']" />
              <SettingsCheck :settings-key="['schedule', 'visibility', 'showSectionType']" :disabled="!$store.state.settings.schedule.visibility.enabled" />
              <SettingsText
                :settings-key="['schedule', 'numScheduleEntries']"
                :min="3"
                :max="10"
                :disabled="!$store.state.settings.schedule.visibility.enabled"
                numeric
              />
              <Divider />
              <SettingsCheck :settings-key="['performance', 'showProgressBar']" />
              <SettingsCheck :settings-key="['pageTitle', 'useTickEmoji']" />
              <!-- TODO Audio volume control -->
            </div>

            <div v-else-if="activeTab === 4" :key="4" class="settings-tab">
              <div class="flex flex-col items-center">
                <img src="/favicon.png" width="64" height="64" class="inline-block bg-red-200 rounded-lg p-2 mb-1">
                <div>
                  <div class="font-bold text-2xl inline-block">
                    AnotherPomodoro
                  </div>
                  <sup class="text-base" v-text="$store.state.version" />
                </div>
                <div v-text="$i18n.t('settings.about.madeby')" />
                <div class="mt-8 flex flex-col justify-center items-center">
                  <!-- Support links -->
                  <div class="mt-3 flex flex-row space-x-2">
                    <a href="https://www.github.com/Hanziness/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings" class="rounded-full bg-black hover:bg-gray-700 active:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:active:bg-gray-800 text-white flex flex-row items-center px-3 py-2 space-x-1 transition-colors">
                      <AboutGithub />
                      <span v-text="$i18n.t('settings.about.source')" />
                    </a>
                    <a href="https://www.buymeacoffee.com/imreg?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings" class="rounded-full bg-yellow-300 hover:bg-yellow-200 active:bg-yellow-400 text-black flex flex-row items-center px-3 py-2 space-x-1 transition-colors">
                      <AboutSupport />
                      <span v-text="$i18n.t('settings.about.support')" />
                    </a>
                  </div>
                  <!-- Share links -->
                  <div class="my-2" v-text="$i18n.t('settings.about.share')" />
                  <div class="flex flex-row items-center space-x-2 text-sm">
                    <a href="https://twitter.com/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings" class="rounded-full w-12 h-12 bg-[#1da1f2] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
                      <AboutTwitter size="24" />
                    </a>
                    <a href="http://www.facebook.com/share.php?u=https://another-pomodoro.netlify.app" class="rounded-full w-12 h-12 bg-[#1877f2] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
                      <AboutFacebook size="24" class="translate-x-[-1px]" />
                    </a>
                    <a href="https://reddit.com/submit?url=https://another-pomodoro.netlify.app" class="rounded-full w-12 h-12 bg-[#ff4500] text-white flex flex-row items-center justify-center space-x-1 transition-colors">
                      <AboutReddit size="24" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Tab bar -->
      <div class="flex-none h-20 flex flex-row p-4">
        <TabHeader :active="activeTab === 1" @click="activeTab = 1">
          <TabIconGeneral /> <span>{{ $i18n.t('settings.tabs.main') }}</span>
        </TabHeader>
        <TabHeader :active="activeTab === 2" @click="activeTab = 2">
          <TabIconSchedule /> <span>{{ $i18n.t('settings.tabs.timer') }}</span>
        </TabHeader>
        <TabHeader :active="activeTab === 3" @click="activeTab = 3">
          <TabIconVisuals /> <span>{{ $i18n.t('settings.tabs.display') }}</span>
        </TabHeader>
        <TabHeader :active="activeTab === 4" @click="activeTab = 4">
          <TabIconAbout /> <span>{{ $i18n.t('settings.tabs.about') }}</span>
        </TabHeader>
      </div>
    </div>
  </section>
</template>

<script>
import { XIcon, AdjustmentsIcon, AlarmIcon, ArtboardIcon, InfoCircleIcon, BrandGithubIcon, CoffeeIcon, BrandTwitterIcon, BrandFacebookIcon, BrandRedditIcon } from 'vue-tabler-icons'
import { timerPresets } from '@/store/settings'
import TabHeader from '@/components/settings/panel/tabHeader.vue'

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
    TabHeader,
    CloseIcon: XIcon,
    // ResetIcon: RefreshAlertIcon,
    TabIconGeneral: AdjustmentsIcon,
    TabIconSchedule: AlarmIcon,
    TabIconVisuals: ArtboardIcon,
    TabIconAbout: InfoCircleIcon,
    InfoIcon: InfoCircleIcon,
    AboutGithub: BrandGithubIcon,
    AboutSupport: CoffeeIcon,
    AboutTwitter: BrandTwitterIcon,
    AboutFacebook: BrandFacebookIcon,
    AboutReddit: BrandRedditIcon
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

<style lang="scss" scoped>
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
  transform: translateY(-10px);
  opacity: 0;
}
</style>
