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
          <!-- <v-card-text class="pb-0">
            <span>Coming soon...</span> -->
          <!-- <span>{{ settings.main }}</span> -->
          <!-- </v-card-text> -->
          <v-list>
            <settings-item
              v-for="(settingsKey, i) in settings[name]"
              :key="i"
              :type="settingsKey.type"
              :state-keys="settingsKey.key"
              :values="settingsKey.values ? settingsKey.values : []"
              :use-rules="settingsKey.rules ? settingsKey.rules : []"
            />
          </v-list>
        </v-tab-item>
      </v-tabs-items>

      <v-card-actions>
        <v-spacer />
        <v-btn color="success" depressed @click="input = false">
          Close
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
          { type: 'boolean', key: ['eventLoggingEnabled'] }
        ],
        timer: [
          { type: 'number', key: ['schedule', 'longPauseInterval'], rules: ['positive'] }
        ],
        display: [
          { type: 'select', key: ['currentTimer'], values: Object.values(AvailableTimers) },
          { type: 'number', key: ['schedule', 'numScheduleEntries'], rules: ['min3'] },
          { type: 'boolean', key: ['performance', 'showProgressBar'] }
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
