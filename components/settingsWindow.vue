<template>
  <v-dialog v-model="input" width="600">
    <v-card>
      <v-card-title>{{ $i18n.t('settings.heading') }}</v-card-title>

      <!-- Tabs -->
      <v-tabs v-model="tab" grow>
        <v-tab v-for="(name, index) in ['main', 'timer', 'display']" :key="index">
          {{ $i18n.t('settings.tabs.' + name) }}
        </v-tab>
      </v-tabs>

      <!-- Tab contents -->
      <v-tabs-items v-model="tab">
        <v-tab-item :key="0">
          <!-- Main -->
          <v-list>
            <settings-item :state-keys="['adaptiveTicking', 'enabled']" type="boolean" show-divider show-description />
            <settings-item :state-keys="['eventLoggingEnabled']" type="boolean" show-divider />
            <permission-settings />
          </v-list>
        </v-tab-item>
        <v-tab-item :key="1">
          <!-- Timer -->
          <v-list>
            <settings-item :state-keys="['schedule', 'longPauseInterval']" :use-rules="['positive']" type="number" show-divider />
            <settings-item
              :state-keys="['schedule', 'lengths']"
              type="preset"
              show-divider
              :custom-value="$store.getters['settings/getActiveSchedulePreset']"
              :values="$store.state.settings.timerPresets"
              :set-value-on-change="false"
              :custom-set-function="(v) => { $store.commit('settings/applyPreset', v) }"
            />
            <settings-item :state-keys="['schedule', 'lengths', 'work']" :use-rules="[additionalData.rules.minOneMinute]" type="time" />
            <settings-item :state-keys="['schedule', 'lengths', 'shortpause']" :use-rules="[additionalData.rules.minOneMinute]" type="time" />
            <settings-item :state-keys="['schedule', 'lengths', 'longpause']" :use-rules="[additionalData.rules.minOneMinute]" type="time" />
          </v-list>
        </v-tab-item>
        <v-tab-item :key="2">
          <!-- Display -->
          <v-list>
            <settings-item :state-keys="['currentTimer']" type="preset" :values="additionalData.AvailableTimers" set-value-on-change show-divider />
            <settings-item :state-keys="['schedule', 'showSchedule']" type="boolean" />
            <settings-item
              :state-keys="['schedule', 'numScheduleEntries']"
              :use-rules="['min3']"
              :disabled="!$store.state.settings.schedule.showSchedule"
              type="number"
              show-divider
            />
            <settings-item :state-keys="['performance', 'showProgressBar']" type="boolean" show-divider />
            <audio-settings />
          </v-list>
        </v-tab-item>
      </v-tabs-items>

      <v-card-actions>
        <v-spacer />
        <v-btn color="success" depressed @click="input = false">
          {{ $i18n.t('settings.buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SettingsItem from '@/components/settings/settingsItem.vue'
import PermissionSettings from '@/components/settings/input/controls/permissionSettings.vue'
import AudioSettings from '@/components/settings/input/audioSettings.vue'
import { AvailableTimers } from '@/store/settings'
import { timeStrToMs } from '@/components/settings/input/controls/inputTime.vue'

export default {
  components: { SettingsItem, PermissionSettings, AudioSettings },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tab: 0,
      additionalData: {
        AvailableTimers: Object.values(AvailableTimers),
        rules: {
          minOneMinute (v) { return timeStrToMs(v) >= 60000 }
        }
      }
    }
  },

  computed: {
    input: {
      get () {
        return this.value
      },
      set (newValue) {
        // this.value = newValue
        this.$emit('input', newValue)
      }
    }
  },

  mounted () {
    // remove 'debug' timer preset in production
    if (process.env.NODE_ENV === 'production' && this.$store.state.settings.timerPresets.debug) {
      const { debug, ...newTimerPreset } = this.$store.state.settings.timerPresets
      this.$store.commit('settings/SET', {
        key: ['timerPresets'],
        value: newTimerPreset
      })
    }
  },

  methods: {
    dummy () {}
  }
}
</script>
