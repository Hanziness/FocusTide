<template>
  <div class="dark:text-gray-100 dark:bg-gray-900 pb-8">
    <div class="pt-8 pb-20 text-center bg-red-100 dark:bg-opacity-25 text-black dark:text-gray-100">
      <img src="/favicon.png" width="64" height="64" class="inline-block bg-red-200 rounded-lg p-2 mb-4">
      <h1 class="text-5xl font-bold uppercase" v-text="$i18n.t('setup.title')" />
    </div>
    <div class="flex 2xl:flex-row flex-col 2xl:space-x-4 mx-auto px-12 -mt-8">
      <!-- Column 1: setup panel -->
      <div class="setup-panel bg-gray-100 dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 shadow-xl rounded-lg divide-y divide-gray-300 dark:divide-gray-700 order-last 2xl:max-w-4xl mt-4 2xl:mt-0 2xl:order-first">
        <SetupStep :title="$i18n.t('setup.steps.language.title')">
          <OptionGroup
            :selected="settingsToApply.lang"
            :values="{'hu': 'hu', 'en': 'en'}"
            :translation-key="'settings.values.lang'"
            @input="settingsToApply.lang = $event"
          />
        </SetupStep>

        <SetupStep :title="$i18n.t('setup.steps.preset.title')" :description="$i18n.t('setup.steps.preset.description')" :attention="mainpreset === undefined">
          <OptionGroup
            :values="{ 'minimalist': 'minimalist', 'default': 'default', 'hardcore': 'hardcore' }"
            :selected="mainpreset"
            translation-key="setup.presets"
            @input="mainpreset = $event"
          />
        </SetupStep>

        <SetupStep :title="$i18n.t('setup.steps.timerpreset.title')" :description="$i18n.t('setup.steps.timerpreset.description')" :attention="timerpreset === undefined">
          <OptionGroup
            :selected="timerpreset"
            :values="{'easy': 'easy', 'default': 'default', 'advanced': 'advanced', 'workaholic': 'workaholic'}"
            translation-key="setup.timerpreset"
            :override-text="timerPresetCustomTexts"
            @input="timerpreset = $event"
          />
        </SetupStep>

        <SetupStep :title="$i18n.t('setup.steps.timerstyle.title')" :description="$i18n.t('setup.steps.timerstyle.description')">
          <OptionGroup
            :selected="settingsToApply.currentTimer"
            :values="{'traditional': 'traditional', 'approximate': 'approxmate', 'percentage': 'percentage'}"
            translation-key="settings.values.currentTimer"
            @input="settingsToApply.currentTimer = $event"
          />
        </SetupStep>

        <SetupStep
          :title="$i18n.t('setup.steps.permissions.title')"
          :description="$i18n.t('setup.steps.permissions.description')"
        >
          <div class="flex flex-col space-y-1">
            <div class="">
              <input v-model="settingsToApply.permissions.audio" type="checkbox" class="w-5 h-5 rounded">
              <span v-text="$i18n.t('setup.permissions.audio')" />
            </div>
            <div class="">
              <input :checked="settingsToApply.permissions.notifications && browserNotificationPermission === 'granted'" :disabled="browserNotificationPermission && browserNotificationPermission !== 'granted'" type="checkbox" class="w-5 h-5 rounded" @change="setNotificationPermissions">
              <span v-text="$i18n.t('setup.permissions.notifications')" />
            </div>
          </div>
        </SetupStep>

        <SetupStep :title="$i18n.t('setup.steps.theme.title')" :description="$i18n.t('setup.steps.theme.description')">
          <OptionGroup
            :selected="settingsToApply.visuals.darkMode === true ? 'dark' : (settingsToApply.visuals.darkMode === false ? 'light' : null)"
            :values="{ 'light': false, 'dark': true }"
            translation-key="setup.theme"
            @input="settingsToApply.visuals.darkMode = ($event === 'dark')"
          />
        </SetupStep>

        <SetupStep :title="$i18n.t('setup.steps.tip.title')" :description="$i18n.t('setup.steps.tip.description')" />

        <a href="/timer" :class="['bg-green-600 text-white font-bold text-lg text-center p-2 rounded-lg border border-green-700 uppercase hover:bg-green-700 cursor-pointer m-4 mt-0 flex flex-row items-center justify-center space-x-1', { 'opacity-60 pointer-events-none': completedSteps < 4 }]" role="button">
          <ReadyIcon />
          <span v-text="$i18n.t('setup.startButton')" />
        </a>
      </div>

      <!-- Column 2: timer preview -->
      <div class="sticky top-1 rounded-lg w-full h-[420px] overflow-hidden shadow-lg">
        <TimerPage class="pointer-events-none" preview />
        <div class="absolute top-2 left-2 flex flex-row space-x-1 rounded-lg bg-blue-100 text-gray-900 p-2 z-10">
          <InfoIcon />
          <span v-text="$i18n.t('setup.preview')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckIcon, InfoCircleIcon } from 'vue-tabler-icons'
import { getNotificationPermissions } from '@/assets/utils/notifications'
import { AvailableTimers } from '@/store/settings'
import OptionGroup from '~/components/base/optionGroup.vue'
import TimerPage from '@/pages/timer.vue'
import { mergeDeep } from '@/assets/utils/mergeDeep'
import SetupStep from '@/components/setup/step.vue'

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
    return {
      step: 0,
      browserNotificationPermission: null,
      mainpreset: undefined,
      timerpreset: undefined,
      originalAppState: JSON.parse(JSON.stringify(this.$store.state.settings)),
      settingsToApply: {
        lang: this.$i18n.locale,
        permissions: {
          audio: this.$store.state.settings.permissions.audio,
          notifications: this.$store.state.settings.permissions.notifications
        },
        visuals: {
          darkMode: this.$store.state.settings.visuals.darkMode
        },
        currentTimer: this.$store.state.settings.currentTimer
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
      presetTimers: {
        default: {
          lengths: {
            work: 25 * 60 * 1000, // 25 minutes
            shortpause: 5 * 60 * 1000, // 5 minutes
            longpause: 15 * 60 * 1000 // 15 minutes
          },
          longPauseInterval: 3 // every 3rd pause is a long one
        },
        easy: {
          lengths: {
            work: 15 * 60 * 1000, // 15 minutes
            shortpause: 5 * 60 * 1000, // 5 minutes
            longpause: 15 * 60 * 1000 // 15 minutes
          },
          longPauseInterval: 2 // every 2nd pause is a long one
        },
        advanced: {
          lengths: {
            work: 40 * 60 * 1000, // 40 minutes
            shortpause: 10 * 60 * 1000, // 10 minutes
            longpause: 30 * 60 * 1000 // 30 minutes
          },
          longPauseInterval: 3 // every 3rd pause is a long one
        },
        workaholic: {
          lengths: {
            work: 50 * 60 * 1000, // 50 minutes
            shortpause: 10 * 60 * 1000, // 5 minutes
            longpause: 30 * 60 * 1000 // 20 minutes
          },
          longPauseInterval: 3 // every 3rd pause is a long one
        }
      }
    }
  },

  head () {
    return {
      title: `AnotherPomodoro: ${this.$i18n.t('setup.head').toLowerCase()}`,
      meta: [{
        hid: 'description',
        content: 'Set up AnotherPomdoro for first use using this setup page.'
      }]
    }
  },

  computed: {
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
          customText.description[key] = this.$i18n.t('setup.timerpreset.description', {
            brief: this.$i18n.t('setup.timerpreset._valueDescription.' + key),
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
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            {
              settings: mergeDeep(this.$store.state.settings, this.newSettings)
            }
          )
        )
        this.$store.commit('settings/_updated')
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

      this.$store.commit('settings/mergeSettings', finalOptions)

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
