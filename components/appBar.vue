<script setup>
import { SettingsIcon, ChecklistIcon } from 'vue-tabler-icons'
import CButton from '@/components/base/button.vue'
import ScheduleView from '@/components/schedule/scheduleDisplay.vue'
import { useOpenPanels } from '@/stores/openpanels'
import { useSchedule } from '~~/stores/schedule'
import { useSettings } from '~~/stores/settings'

const openPanels = useOpenPanels()
const scheduleStore = useSchedule()
const settingsStore = useSettings()
</script>

<template>
  <div class="flex flex-row items-center w-full gap-2 px-4 my-1 isolate h-14" :style="{ '--theme': settingsStore.visuals.darkMode ? '245 245 244' : '15 23 42' }">
    <div class="flex-shrink-0 h-10 px-2 py-2 rounded-full bg-themed">
      <ClientOnly>
        <ScheduleView />
      </ClientOnly>
    </div>
    <div class="flex-shrink overflow-hidden text-lg select-none text-ellipsis" v-text="$t('section.' + scheduleStore.getCurrentItem.type).toLowerCase()" />
    <div class="flex-grow" />
    <CButton
      v-if="settingsStore.tasks.enabled"
      :importance="2"
      inner-class="!py-2"
      bg-class="ring-themed shadow-themed border-themed"
      class="dark:text-slate-200 text-slate-900"
      @click="openPanels.todo = !openPanels.todo"
    >
      <ChecklistIcon class="inline-block" />
    </CButton>
    <CButton
      :importance="2"
      inner-class="!py-2"
      bg-class="ring-themed shadow-themed border-themed"
      class="dark:text-slate-200 text-slate-900"
      @click="openPanels.settings = !openPanels.settings"
    >
      <SettingsIcon class="inline-block" />
    </CButton>
  </div>
</template>
