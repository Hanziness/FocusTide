<script setup lang="ts">
import { LanguageIcon } from 'vue-tabler-icons'
import OptionGroup from '~~/components/base/optionGroup.vue'
import { useSettings } from '~~/stores/settings';

const settingsStore = useSettings()
</script>

<template>
  <div class="flex flex-col justify-start items-center gap-2">
    <div class="px-6 py-3 flex gap-2 text-lg flex-row justify-center items-center">
      <LanguageIcon :size="42" />
      Choose your language
    </div>

    <OptionGroup
      class="w-full"
      :choices="$languages"
      :value="settingsStore.lang"
      :override-text="{ title: $languages, description: {} }"
      @input="(newLang) => { settingsStore.lang = newLang }"
    />
  </div>
</template>
