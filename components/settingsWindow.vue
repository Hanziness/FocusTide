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
        <v-tab-item v-for="(contents, name, index) in settings" :key="index">
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
              />
              <v-divider v-if="!settingsKey.noDividerAfter && i !== contents.length - 1" :key="'div-' + i" class="my-1" />
            </template>
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
      settings: {
        main: [
          { type: 'boolean', key: ['adaptiveTicking', 'enabled'], showDescription: true },
          { type: 'boolean', key: ['eventLoggingEnabled'] }
        ],
        timer: [
          { type: 'number', key: ['schedule', 'longPauseInterval'], rules: ['positive'] },
          { type: 'time', key: ['schedule', 'lengths', 'work'], noDividerAfter: true },
          { type: 'time', key: ['schedule', 'lengths', 'shortpause'], noDividerAfter: true },
          { type: 'time', key: ['schedule', 'lengths', 'longpause'] }
        ],
        display: [
          { type: 'preset', key: ['currentTimer'], values: Object.values(AvailableTimers) },
          { type: 'boolean', key: ['schedule', 'showSchedule'] },
          {
            type: 'number',
            key: ['schedule', 'numScheduleEntries'],
            rules: ['min3'],
            enabledIf: [
              ['schedule', 'showSchedule']
            ]
          },
          { type: 'boolean', key: ['performance', 'showProgressBar'], showDescription: true }
        ]
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
