<template>
  <BaseSettingsItem :settings-key="settingsKey" :disabled="disabled" :custom-value="customValue" :custom-set-function="customSetFunction">
    <template #content-main="{ settingsValue, update, translationKey }">
      <OptionGroup :translation-key="translationKey" :values="values" :selected="settingsValue" @input="update" />
    </template>
  </BaseSettingsItem>
</template>

<script>
export default {
  components: {
    BaseSettingsItem: () => import(/* webpackMode: "eager" */ '@/components/settings/baseSettingsItem.vue'),
    OptionGroup: () => import(/* webpackChunkName: "uibase" */ '@/components/base/optionGroup.vue')
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
