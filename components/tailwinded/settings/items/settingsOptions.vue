<template>
  <settings-resolver :settings-key="settingsKey">
    <!-- <div slot-scope="{ svalue }" class="w-full bg-red-300 asd"> -->
    <!-- ASD {{ svalue }} -->
    <!-- Okay, so I guess svalue is NOT reactive once passed into a slot. Great... -->
    <base-settings-item slot-scope="{ value, update, translationKey }" :settings-value="value" :translation-key="translationKey">
      <template #content-main="{ settingsValue }">
        <option-group :translation-key="translationKey" :values="values" :selected="settingsValue" @input="update" />
      </template>
    </base-settings-item>
    <!-- </div> -->
  </settings-resolver>
</template>

<script>
export default {
  components: {
    SettingsResolver: () => import('@/components/tailwinded/settings/renderlessSettingsResolver.vue'),
    BaseSettingsItem: () => import('@/components/tailwinded/settings/baseSettingsItemBare.vue'),
    OptionGroup: () => import('@/components/tailwinded/base/optionGroup.vue')
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    values: {
      type: Object,
      default: () => {}
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
