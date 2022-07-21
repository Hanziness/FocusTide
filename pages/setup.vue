<template>
  <div class="dark:text-gray-100 dark:bg-gray-900 pb-8">
    <div class="dark:bg-opacity-25 dark:text-gray-100 pt-8 pb-20 text-center text-black bg-red-100">
      <img src="/favicon.svg" width="64" height="64" class="inline-block p-2 mb-4 bg-red-200 rounded-lg">
      <h1 class="text-5xl font-bold uppercase" v-text="$t('setup.title')" />
    </div>
    <div class="2xl:flex-row 2xl:space-x-4 flex flex-col px-12 mx-auto -mt-8">
      <!-- Column 1: setup panel -->
      <div class="setup-panel dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:divide-gray-700 2xl:max-w-4xl 2xl:mt-0 2xl:order-first order-last mt-4 bg-gray-100 border border-gray-300 divide-y divide-gray-300 rounded-lg shadow-xl">
        <SetupStep :title="$t('setup.steps.language.title')">
          <OptionGroup
            :selected="settingsToApply.lang"
            :values="$languages"
            :override-text="{ title: $languages, description: null }"
            @input="settingsToApply.lang = $event"
          />
        </SetupStep>

        <SetupStep :title="$t('setup.steps.preset.title')" :description="$t('setup.steps.preset.description')" :attention="mainpreset === undefined">
          <OptionGroup
            :values="{ 'minimalist': 'minimalist', 'default': 'default', 'hardcore': 'hardcore' }"
            :selected="mainpreset"
            translation-key="setup.presets"
            @input="mainpreset = $event"
          />
        </SetupStep>

        <SetupStep :title="$t('setup.steps.timerpreset.title')" :description="$t('setup.steps.timerpreset.description')" :attention="timerpreset === undefined">
          <OptionGroup
            :selected="timerpreset"
            :values="{'easy': 'easy', 'default': 'default', 'advanced': 'advanced', 'workaholic': 'workaholic'}"
            translation-key="timerpreset"
            :override-text="timerPresetCustomTexts"
            @input="timerpreset = $event"
          />
        </SetupStep>

        <SetupStep :title="$t('setup.steps.timerstyle.title')" :description="$t('setup.steps.timerstyle.description')">
          <OptionGroup
            :selected="settingsToApply.currentTimer"
            :values="{'traditional': 'traditional', 'approximate': 'approxmate', 'percentage': 'percentage'}"
            translation-key="settings.values.currentTimer"
            @input="settingsToApply.currentTimer = $event"
          />
        </SetupStep>

        <SetupStep
          :title="$t('setup.steps.permissions.title')"
          :description="$t('setup.steps.permissions.description')"
        >
          <div class="flex flex-col space-y-1">
            <div class="">
              <input v-model="settingsToApply.permissions.audio" type="checkbox" class="w-5 h-5 rounded">
              <span v-text="$t('setup.permissions.audio')" />
            </div>
            <div class="">
              <input :checked="settingsToApply.permissions.notifications && browserNotificationPermission === 'granted'" :disabled="browserNotificationPermission && browserNotificationPermission !== 'granted'" type="checkbox" class="w-5 h-5 rounded" @change="setNotificationPermissions">
              <span v-text="$t('setup.permissions.notifications')" />
            </div>
          </div>
        </SetupStep>

        <SetupStep :title="$t('setup.steps.theme.title')" :description="$t('setup.steps.theme.description')">
          <OptionGroup
            :selected="settingsToApply.visuals.darkMode === true ? 'dark' : (settingsToApply.visuals.darkMode === false ? 'light' : null)"
            :values="{ 'light': false, 'dark': true }"
            translation-key="setup.theme"
            @input="settingsToApply.visuals.darkMode = ($event === 'dark')"
          />
        </SetupStep>

        <SetupStep :title="$t('setup.steps.tip.title')" :description="$t('setup.steps.tip.description')" />

        <a href="/timer" :class="['bg-green-600 text-white font-bold text-lg text-center p-2 rounded-lg border border-green-700 uppercase hover:bg-green-700 cursor-pointer m-4 mt-0 flex flex-row items-center justify-center space-x-1', { 'opacity-60 pointer-events-none': completedSteps < 4 }]" role="button">
          <ReadyIcon />
          <span v-text="$t('setup.startButton')" />
        </a>
      </div>

      <!-- Column 2: timer preview -->
      <div class="sticky top-1 rounded-lg w-full h-[420px] overflow-hidden shadow-lg">
        <TimerPage class="pointer-events-none" preview />
        <div class="top-2 left-2 absolute z-10 flex flex-row p-2 space-x-1 text-gray-900 bg-blue-100 rounded-lg">
          <InfoIcon />
          <span v-text="$t('setup.preview')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon, InfoCircleIcon } from 'vue-tabler-icons'
import { mapStores } from 'pinia'
import { getNotificationPermissions } from '@/assets/utils/notifications'
import { AvailableTimers, useSettings } from '@/stores/settings'
import OptionGroup from '~/components/base/optionGroup.vue'
import TimerPage from '@/pages/timer.vue'
import { mergeDeep } from '@/assets/utils/mergeDeep'
import SetupStep from '@/components/setup/step.vue'

import presetTimers from '@/assets/settings/timerPresets'

export default {
  name: 'PageSetup',
  components: {
    ReadyIcon: CheckIcon,
    InfoIcon: InfoCircleIcon,
    OptionGroup,
    TimerPage,
    SetupStep
  },

  transition: {
    name: 'transition-setup',
    mode: 'out-in'
  },

  data () {
    const settingsStore = useSettings()
    return {
      step: 0,
      browserNotificationPermission: null,
      mainpreset: undefined,
      timerpreset: undefined,
      originalAppState: settingsStore.$state,
      settingsToApply: {
        lang: this.$i18n.locale,
        permissions: {
          audio: settingsStore.permissions.audio,
          notifications: settingsStore.permissions.notifications
        },
        visuals: {
          darkMode: settingsStore.visuals.darkMode
        },
        currentTimer: settingsStore.currentTimer
      },
      presets: {
        minimalist: {
          settings: {
            // disable schedule
            schedule: {
              visibility: {
                enabled: false,
                showSectionType: false
              }
            },
            // disable tasks
            tasks: {
              enabled: false
            }
          }
        },
        default: {
          settings: {
            // enable schedule
            schedule: {
              visibility: {
                enabled: true,
                showSectionType: true
              }
            },
            // disable tasks
            tasks: {
              enabled: false
            },
            currentTimer: AvailableTimers.TIMER_APPROXIMATE
          }
        },
        hardcore: {
          settings: {
            // enable schedule
            schedule: {
              visibility: {
                enabled: true,
                showSectionType: true
              }
            },
            // disable tasks
            tasks: {
              enabled: true
            }
          }
        }
      },
      presetTimers
    }
  },

  head () {
    return {
      title: `AnotherPomodoro: ${this.$t('setup.head').toLowerCase()}`,
      meta: [{
        hid: 'description',
        name: 'description',
        content: 'Set up AnotherPomdoro for first use using this setup page. You can customize the theme, the timers, pauses and the features of the app.'
      }]
    }
  },

  computed: {
    ...mapStores(useSettings),

    completedSteps () {
      let completed = 0

      completed += this.mainpreset !== undefined ? 1 : 0
      completed += this.timerpreset !== undefined ? 1 : 0
      completed += this.settingsToApply.lang !== undefined ? 1 : 0
      completed += this.settingsToApply.visuals.darkMode !== undefined ? 1 : 0

      return completed
    },

    newSettings () {
      return mergeDeep(this.presets[this.mainpreset] ? this.presets[this.mainpreset].settings : {}, this.settingsToApply)
    },

    timerPresetCustomTexts () {
      const customText = {
        title: {},
        description: {}
      }

      for (const key in this.presetTimers) {
        if (Object.hasOwnProperty.call(this.presetTimers, key)) {
          const preset = this.presetTimers[key]
          customText.description[key] = this.$t('timerpreset.description', {
            brief: this.$t('timerpreset._valueDescription.' + key),
            worklength: preset.lengths.work / 60000,
            splength: preset.lengths.shortpause / 60000,
            lplength: preset.lengths.longpause / 60000,
            lpfreq: preset.longPauseInterval
          })
        }
      }

      return customText
    }
  },

  watch: {
    newSettings: {
      handler () {
        this.settingsStore.$reset()
        this.settingsStore.$patch(Object.assign(
          {}, mergeDeep(this.settingsStore.$state, this.newSettings)
        ))
      },
      deep: true
    },

    mainpreset (newValue) {
      this.settingsToApply = mergeDeep(this.settingsToApply, newValue ? this.presets[newValue].settings : {})
    },

    timerpreset (newValue) {
      this.settingsToApply = mergeDeep(this.settingsToApply, newValue ? { schedule: this.presetTimers[newValue] } : {})
    }
  },

  mounted () {
    let finalPermission = null
    if (typeof Notification === 'undefined' || (typeof Notifaction !== 'undefined' && Notification.permission === 'denied')) {
      finalPermission = 'denied'
    }

    this.browserNotificationPermission = finalPermission
  },

  methods: {
    applyFinalSettings () {
      const finalOptions = {
        ...this.presets[this.mainpreset].settings
      }

      this.settingsStore.$patch(finalOptions)

      this.$router.push('/timer')
    },

    async setNotificationPermissions () {
      if (this.browserNotificationPermission === null) {
        const permission = await getNotificationPermissions()
        if (permission !== 'granted') {
          this.settingsToApply.permissions.notifications = false
        }
        this.browserNotificationPermission = permission
      }
    }
  }
}
</script>

<style lang="scss">
.transition-setup-enter-active,
.transition-setup-leave-active {
  @apply transition-all duration-500;
}

.transition-setup-enter {
  @apply opacity-0 translate-y-4;

  clip-path: circle(0%);
}

.transition-setup-leave-to {
  @apply opacity-0 -translate-y-4;
}

.transition-setup-enter-to {
  @apply opacity-100 translate-y-0;

  clip-path: circle(75%);
}
</style>
