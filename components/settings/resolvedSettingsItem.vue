<template>
  <SettingsResolver :settings-key="settingsKey" :custom-value="customValue" :custom-set-function="customSetFunction">
    <BaseSettingsItemBare
      slot-scope="{ value, update, error, lastError, translationKey }"
      :disabled="disabled"
      :settings-key="settingsKey"
      :settings-value="value"
      :error-value="lastError"
      :translation-key="translationKey"
    >
      <template #content-action="{ settingsValue }">
        <slot
          name="content-action"
          :settings-value="settingsValue"
          :update="update"
          :error="error"
          :last-error="lastError"
        />
      </template>

      <template #content-main="{ settingsValue }">
        <slot
          name="content-main"
          :settings-value="settingsValue"
          :translation-key="translationKey"
          :values="values"
          :selected="settingsValue"
          :update="update"
        />
      </template>
    </BaseSettingsItemBare>
  </SettingsResolver>
</template>

<script>
import settingsInputMixin from '@/assets/mixins/settings/settingsItemBase'

import SettingsResolver from '@/components/settings/renderlessSettingsResolver.vue'
import BaseSettingsItemBare from '@/components/settings/baseSettingsItem.vue'

export default {
  components: {
    SettingsResolver,
    BaseSettingsItemBare
  },

  mixins: [settingsInputMixin],

  props: {
    values: {
      type: Object,
      default: () => {}
    },

    customValue: {
      type: [Number, String, Object],
      default: undefined
    }
  }
}
</script>
