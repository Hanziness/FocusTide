<template>
  <v-dialog v-model="input" width="600">
    <v-card>
      <v-card-title>{{ $i18n.t('settings.heading') }}</v-card-title>
      <v-tabs v-model="tab" grow>
        <v-tab v-for="(contents, name, index) in settings" :key="index">
          {{ $i18n.t('settings.tabs.' + name) }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- <v-tab-item v-for="(contents, name, index) in settings" :key="index">
          <v-list>
            <template
              v-for="(settingsKey, i) in settings[name]"
            >
              <settings-item
                :key="i"
                :type="settingsKey.type"
                :state-keys="settingsKey.key"
                :values="settingsKey.values ? settingsKey.values : []"
                :use-rules="settingsKey.rules ? settingsKey.rules : []"
                :show-description="settingsKey.showDescription ? settingsKey.showDescription : false"
                :visible-if="settingsKey.visibleIf ? settingsKey.visibleIf : []"
                :enabled-if="settingsKey.enabledIf ? settingsKey.enabledIf : []"
                :disabled-if="settingsKey.disabledIf ? settingsKey.disabledIf : []"
                :extra-values="settingsKey.extraValues ? settingsKey.extraValues : {}"
                :extra-attributes="settingsKey.extraAttributes ? settingsKey.extraAttributes : {}"
              />
              <v-divider v-if="!settingsKey.noDividerAfter && i !== contents.length - 1" :key="'div-' + i" class="my-1" />
            </template>
          </v-list>
        </v-tab-item> -->
        <v-tab-item :key="0">
          <!-- Main -->
          <v-list>
            <settings-item :state-keys="['adaptiveTicking', 'enabled']" type="boolean" show-divider show-description />
            <settings-item :state-keys="['eventLoggingEnabled']" type="boolean" />
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
            <settings-item :state-keys="['schedule', 'lengths', 'work']" type="time" />
            <settings-item :state-keys="['schedule', 'lengths', 'shortpause']" type="time" />
            <settings-item :state-keys="['schedule', 'lengths', 'longpause']" type="time" />
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
            />
            <settings-item :state-keys="['performance', 'showProgressBar']" type="boolean" />
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
import { AvailableTimers } from '@/store/settings'

export default {
  components: { SettingsItem },

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
        AvailableTimers: Object.values(AvailableTimers)
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

  methods: {
    dummy () {}
  }
}
</script>
