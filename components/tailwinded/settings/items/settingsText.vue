<template>
  <settings-resolver :settings-key="settingsKey">
    <base-settings-item slot-scope="{ value, update, error, translationKey }" :settings-value="value" :translation-key="translationKey">
      <template #content-action="{ settingsValue }">
        <input
          class="form-input w-full text-right bg-gray-200 focus:bg-white"
          type="text"
          :value="settingsValue"
          @input="checkUpdate($event.target.value, update, error)"
        >
      </template>
    </base-settings-item>
  </settings-resolver>
</template>

<script>
export default {
  components: {
    SettingsResolver: () => import('@/components/tailwinded/settings/renderlessSettingsResolver.vue'),
    BaseSettingsItem: () => import('@/components/tailwinded/settings/baseSettingsItemBare.vue')
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    rules: {
      type: Array,
      default: () => []
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
