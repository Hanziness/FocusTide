<template>
  <BaseSettingsItem :settings-key="settingsKey" :disabled="disabled" :custom-value="customValue" :custom-set-function="customSetFunction">
    <template #content-main="{ settingsValue, update, translationKey }">
      <OptionGroup :translation-key="overrideTranslationKey ? overrideTranslationKey : translationKey" :values="values" :selected="settingsValue" @input="update" />
    </template>
  </BaseSettingsItem>
</template>

<script>
import BaseSettingsItem from '@/components/settings/resolvedSettingsItem.vue'
import OptionGroup from '@/components/base/optionGroup.vue'

export default {
  components: {
    BaseSettingsItem,
    OptionGroup
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    values: {
      type: Object,
      default: () => {}
    },

    disabled: {
      type: Boolean,
      default: false
    },

    /** Value used for preset controls to specify active item (read-only) */
    customValue: {
      type: [Number, String, Object],
      default: undefined
    },

    customSetFunction: {
      type: Function,
      default: undefined
    },

    overrideTranslationKey: {
      type: String,
      default: null
    }
  },

  methods: {
    // TODO This might have to be moved into a mixin:
    checkUpdate (newValue, updateFn, errorFn) {
      let pass = true

      for (const rule in this.rules) {
        const rulePass = rule(newValue)
        if (rulePass !== true) {
          pass = rulePass
        }
      }

      if (pass === true) {
        updateFn(newValue)
      } else {
        errorFn(pass)
      }
    }
  }
}
</script>
