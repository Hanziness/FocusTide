<template>
  <settings-resolver :settings-key="settingsKey">
    <base-settings-item slot-scope="{ value, update, translationKey }" :settings-value="value" :translation-key="translationKey">
      <template #content-action="{ settingsValue }">
        <input
          class="form-checkbox w-6 h-6 bg-gray-200 cursor-pointer"
          type="checkbox"
          :checked="settingsValue"
          @input="update($event.target.checked)"
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
    }
  }
}
</script>
