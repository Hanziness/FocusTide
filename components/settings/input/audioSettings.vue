<template>
  <div>
    <settings-item :state-keys="['audio', 'soundSet']" type="preset" :values="availableSoundSets" :visible="availableSoundSets.length > 1" />
    <settings-item-base :settings-key="settingsKeys.volume">
      <template v-slot:content-main>
        <slider-input v-model="volumeLevel" :custom-label="Math.round(volumeLevel * 100) + '%'" :step="0.01" class="mx-2" />
      </template>
    </settings-item-base>
    <v-divider v-if="showDivider" class="my-1" />
  </div>
</template>

<script>
import SettingsItemBase from '@/components/settings/settingsItemBase.vue'
import SettingsItem from '@/components/settings/settingsItem.vue'
import SliderInput from '@/components/settings/input/controls/inputSlider.vue'

import { AvailableSoundSets } from '@/store/settings'

export default {
  components: { SettingsItemBase, SliderInput, SettingsItem },

  props: {
    showDivider: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      settingsKeys: {
        volume: ['audio', 'volume']
      },
      availableSoundSets: Object.values(AvailableSoundSets)
    }
  },

  computed: {
    volumeLevel: {
      get () {
        return this.$store.state.settings.audio.volume
      },
      set (newValue) {
        this.$store.commit('settings/SET', { key: this.settingsKeys.volume, value: newValue })
      }
    }
  }
}
</script>
