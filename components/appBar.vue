<script setup>
import { SettingsIcon, ChecklistIcon } from 'vue-tabler-icons'
import CButton from '~~/components/base/uiButton.vue'
import ScheduleView from '@/components/schedule/scheduleDisplay.vue'
import { useOpenPanels } from '@/stores/openpanels'
import { useSchedule } from '~~/stores/schedule'
import { useSettings } from '~~/stores/settings'

const openPanels = useOpenPanels()
const scheduleStore = useSchedule()
const settingsStore = useSettings()
</script>

<template>
  <div class="flex flex-row items-center w-full gap-2 px-4 my-1 isolate h-14">
    <div v-show="settingsStore.schedule.visibility.enabled" class="flex-shrink-0 h-10 px-2 py-2 rounded-full bg-surface-dark">
      <ClientOnly>
        <ScheduleView />
      </ClientOnly>
    </div>
    <div v-show="settingsStore.schedule.visibility.enabled && settingsStore.schedule.visibility.showSectionType" class="flex-shrink overflow-hidden text-lg whitespace-pre select-none text-ellipsis text-surface-onlight dark:text-surface-ondark" v-text="$t('section.' + scheduleStore.getCurrentItem.type).toLowerCase()" />
    <div class="flex-grow" />
    <CButton
      v-show="settingsStore.tasks.enabled"
      circle
      :importance="2"
      bg-class="ring-themed shadow-themed border-themed"
      class="h-10 transition rounded-full dark:text-slate-200 text-slate-900"
      :class="{ 'bg-themed !text-slate-200 dark:!text-slate-900' : openPanels.todo }"
      inner-class="!p-1"
      @click="openPanels.todo = !openPanels.todo"
    >
      <ChecklistIcon class="inline-block" />
    </CButton>
    <CButton
      circle
      :importance="2"
      bg-class="ring-themed shadow-themed border-themed"
      class="h-10 dark:text-slate-200 text-slate-900"
      inner-class="!p-1"
      @click="openPanels.settings = !openPanels.settings"
    >
      <SettingsIcon class="inline-block" />
    </CButton>
  </div>
</template>
