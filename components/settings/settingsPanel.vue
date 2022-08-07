<template>
  <section v-show="processedValue" class="fixed z-40 w-full h-full p-0 md:p-4 md:max-w-screen-sm">
    <div class="flex flex-col h-full overflow-hidden bg-white rounded-none shadow-lg md:rounded-lg dark:bg-gray-900 dark:text-gray-50">
      <h1 class="px-4 mt-4 mb-2 text-xl font-bold uppercase">
        <span>{{ $t('settings.heading') }}</span>
        <Button
          :aria-label="$t('settings.buttons.close')"
          default-style
          circle
          :importance="3"
          class="float-right -mt-2 -mr-2"
          tabindex="0"
          @click="processedValue = false"
        >
          <CloseIcon :aria-label="$t('settings.buttons.close')" />
        </Button>
      </h1>
      <div class="flex-grow overflow-y-auto">
        <Transition tag="div" name="tab-transition" mode="out-in" class="relative w-full overflow-hidden">
          <!-- Core settings -->
          <div v-if="activeTab === 1" :key="1" class="settings-tab">
            <OptionGroup
              :choices="$languages"
              :value="settingsStore.lang"
              :override-text="{ title: $languages, description: null }"
              @input="(newLang) => { settingsStore.lang = newLang }"
            />
            <Divider />
            <SettingsItem type="check" :path="['adaptiveTicking', 'enabled']" />
            <SettingsItem type="check" :path="['timerControls', 'enableKeyboardShortcuts']" />
            <Divider />
            <SettingsItem type="check" :path="['permissions', 'audio']" />
            <SettingsItem
              type="check"
              :path="['permissions', 'notifications']"
              :set-value-on-change="false"
              :disabled="notificationsEnabled === false"
              @input="(newValue) => {
                if (runtimeConfig.public.platform === 'web' && newValue === true) {
                  eventsStore.recordEvent('web.permission.notification')
                }
              }"
            />

            <Divider />

            <SettingsItem type="check" :path="['tasks', 'enabled']" />
            <SettingsItem
              type="number"
              :path="['tasks', 'maxActiveTasks']"
              :min="1"
              :max="15"
              :disabled="!settingsStore.tasks.enabled"
            />
            <SettingsItem type="check" :path="['tasks', 'removeCompletedTasks']" :disabled="!settingsStore.tasks.enabled" />

            <Divider />

            <div v-text="$t('settings.manage.heading')" />
            <div class="-mt-2 text-sm leading-snug text-black text-opacity-75 dark:text-gray-50 dark:text-opacity-75" v-text="$t('settings.manage.description')" />
            <div class="grid grid-flow-col grid-cols-2 gap-2 mt-1">
              <ExportButton />
              <ImportButton />
            </div>

            <Divider />

            <SettingsItem type="check" :path="['reset']" />
          </div>

          <!-- Schedule -->
          <div v-else-if="activeTab === 2" :key="2" class="settings-tab">
            <SettingsItem type="number" :path="['schedule', 'longPauseInterval']" :min="1" :max="10" />
            <Divider />

            <SettingsItem
              type="empty"
              :path="['schedule', 'lengths']"
            >
              <OptionGroup
                translation-key="timerpreset"
                :choices="timerPresets"
                :value="settingsStore.getActiveSchedulePreset"
                @input="(newPreset) => settingsStore.applyPreset(newPreset)"
              />
            </SettingsItem>
            <SettingsItem type="time" :path="['schedule', 'lengths', 'work']" :min-ms="5000" />
            <SettingsItem type="time" :path="['schedule', 'lengths', 'shortpause']" :min-ms="5000" />
            <SettingsItem type="time" :path="['schedule', 'lengths', 'longpause']" :min-ms="5000" />
            <div class="flex flex-row items-center px-3 py-4 space-x-2 rounded-lg ring-inset ring ring-primary bg-primary/20 dark:bg-gray-700 dark:text-gray-100">
              <InfoIcon />
              <span v-text="$t('settings.scheduleMinTime')" />
            </div>
          </div>

          <!-- Display -->
          <div v-else-if="activeTab === 3" :key="3" class="settings-tab">
            <SettingsItem type="check" :path="['visuals', 'darkMode']" />
            <Divider />
            <SettingsItem type="option" :path="['currentTimer']" :choices="{traditional: 'traditional', approximate: 'approximate', percentage: 'percentage'}" />
            <Divider />
            <SettingsItem type="check" :path="['schedule', 'visibility', 'enabled']" />
            <SettingsItem type="check" :path="['schedule', 'visibility', 'showSectionType']" :disabled="!settingsStore.schedule.visibility.enabled" />
            <SettingsItem
              type="number"
              :path="['schedule', 'numScheduleEntries']"
              :min="3"
              :max="10"
              :disabled="!settingsStore.schedule.visibility.enabled"
            />
            <Divider />
            <SettingsItem type="check" :path="['performance', 'showProgressBar']" />
            <SettingsItem type="check" :path="['pageTitle', 'useTickEmoji']" />
            <!-- TODO Audio volume control -->
          </div>

          <!-- About page -->
          <div v-else-if="activeTab === 4" :key="4" class="settings-tab">
            <div class="flex flex-col items-center">
              <img src="/favicon.svg" width="64" height="64" class="inline-block p-2 mb-1 bg-red-200 rounded-lg">
              <div>
                <div class="inline-block text-2xl font-bold">
                  AnotherPomodoro
                </div>
                <sup class="text-base" v-text="version" />
              </div>
              <div v-text="$t('settings.about.madeby')" />
              <div class="flex flex-col items-center justify-center mt-8">
                <!-- Support links -->
                <div class="flex flex-row flex-wrap justify-center gap-2 mt-3 text-center">
                  <Button
                    :importance="1"
                    dark
                    link
                    href="https://www.github.com/Hanziness/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
                    inner-class="flex flex-row items-center gap-1 text-slate-50 text-gray-50"
                    bg-class="bg-slate-900 dark:bg-slate-700"
                  >
                    <AboutGithub />
                    <span v-text="$t('settings.about.source')" />
                  </Button>
                  <Button
                    :importance="1"
                    link
                    href="https://www.buymeacoffee.com/imreg?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
                    inner-class="flex flex-row items-center gap-1 text-black"
                    bg-class="bg-yellow-300"
                  >
                    <AboutSupport />
                    <span v-text="$t('settings.about.support')" />
                  </Button>
                </div>
                <!-- Share links -->
                <div class="my-2" v-text="$t('settings.about.share')" />
                <div class="flex flex-row items-center space-x-2 text-sm">
                  <Button
                    link
                    circle
                    dark
                    :importance="1"
                    href="https://twitter.com/AnotherPomodoro?utm_source=AnotherPomodoro&utm_medium=web&utm_content=settings"
                    bg-class="bg-[#1da1f2]"
                    inner-class="!p-4 text-slate-50"
                  >
                    <AboutTwitter :aria-label="$t('index.alt.links.share.twitter')" size="24" />
                  </Button>
                  <Button
                    link
                    circle
                    dark
                    :importance="1"
                    href="http://www.facebook.com/share.php?u=https://another-pomodoro.netlify.app"
                    bg-class="bg-[#1877f2]"
                    inner-class="!p-4 text-slate-50"
                  >
                    <AboutFacebook :aria-label="$t('index.alt.links.share.facebook')" size="24" class="translate-x-[-1px]" />
                  </Button>
                  <Button
                    link
                    circle
                    dark
                    :importance="1"
                    href="https://reddit.com/submit?url=https://another-pomodoro.netlify.app"
                    bg-class="bg-[#ff4500]"
                    inner-class="!p-4 text-slate-50"
                  >
                    <AboutReddit :aria-label="$t('index.alt.links.share.reddit')" size="24" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Tab bar -->
      <div class="flex flex-row flex-none h-20 p-4">
        <TabHeader :active="activeTab === 1" :text="$t('settings.tabs.main')" @click="activeTab = 1">
          <template #icon>
            <TabIconGeneral role="presentation" />
          </template>
        </TabHeader>
        <TabHeader :active="activeTab === 2" :text="$t('settings.tabs.timer')" @click="activeTab = 2">
          <template #icon>
            <TabIconSchedule role="presentation" />
          </template>
        </TabHeader>
        <TabHeader :active="activeTab === 3" :text="$t('settings.tabs.display')" @click="activeTab = 3">
          <template #icon>
            <TabIconVisuals role="presentation" />
          </template>
        </TabHeader>
        <TabHeader :active="activeTab === 4" :text="$t('settings.tabs.about')" @click="activeTab = 4">
          <template #icon>
            <TabIconAbout role="presentation" />
          </template>
        </TabHeader>
      </div>
    </div>
  </section>
</template>

<script>
import { XIcon, AdjustmentsIcon, AlarmIcon, ArtboardIcon, InfoCircleIcon, BrandGithubIcon, CoffeeIcon, BrandTwitterIcon, BrandFacebookIcon, BrandRedditIcon } from 'vue-tabler-icons'

import { mapActions, mapState, mapStores } from 'pinia'
import OptionGroup from '@/components/base/optionGroup.vue'
import TabHeader from '@/components/settings/panel/tabHeader.vue'
import ExportButton from '@/components/settings/exportButton.vue'
import ImportButton from '@/components/settings/importButton.vue'

import presetTimers from '@/assets/settings/timerPresets'
import { useSettings } from '~~/stores/settings'
import { useNotifications } from '~~/stores/notifications'
import { useMain } from '~~/stores'

import Button from '@/components/base/button.vue'
import SettingsItem from '~~/components/settings/settingsItem.vue'
import Divider from '@/components/base/divider.vue'
import { useEvents } from '~~/stores/events'

export default {
  name: 'SettingsPanel',
  components: {
    // UiOverlay: () => import('@/components/base/overlay.vue'),
    SettingsItem,
    Button,
    Divider,
    OptionGroup,
    TabHeader,
    ExportButton,
    ImportButton,
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
    modelValue: {
      type: Boolean,
      default: false
    }
  },

  setup () {
    return {
      runtimeConfig: useRuntimeConfig()
    }
  },

  data () {
    return {
      activeTab: 1,
      resetConfirm: false,
      timerPresets: presetTimers
    }
  },

  computed: {
    ...mapStores(useSettings, useEvents),
    ...mapState(useMain, ['version']),
    ...mapState(useNotifications, {
      notificationsEnabled: 'enabled'
    }),

    processedValue: {
      get () { return this.modelValue },
      set (newValue) { this.$emit('update:modelValue', newValue) }
    },

    notificationPermission: () => {
      return Notification ? (Notification.permission === 'granted' && this.settingsStore.permissions.notifications) : false
    }
  },

  methods: {
    ...mapActions(useNotifications, {
      updateNotificationsEnabled: 'updateEnabled'
    }),

    changeNotificationSettings (newValue) {
      this.notificationPermission = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
div.settings-tab {
  @apply grid grid-cols-1 gap-2 py-3 px-4;
}

// ===== TAB TRANSITIONS =====
.tab-transition-enter-active,
.tab-transition-leave-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  // transition: opacity 0.5s ease-out;
  position: relative;
}

.tab-transition-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.tab-transition-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
