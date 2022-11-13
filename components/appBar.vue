<script setup>
import { SettingsIcon, ChecklistIcon } from 'vue-tabler-icons'
import CButton from '@/components/base/button.vue'
import ScheduleView from '@/components/schedule/scheduleDisplay.vue'
import { useOpenPanels } from '@/stores/openpanels'
import { useSchedule } from '~~/stores/schedule'

const openPanels = useOpenPanels()
const scheduleStore = useSchedule()
</script>

<template>
  <div class="flex flex-row items-center w-full gap-2 px-4 my-1 isolate h-14" :style="{ '--theme': '15 23 42' }">
    <div class="h-10 px-2 py-2 rounded-full bg-themed">
      <ClientOnly>
        <ScheduleView />
      </ClientOnly>
    </div>
    <div class="text-lg select-none" v-text="$t('section.' + scheduleStore.getCurrentItem.type).toLowerCase()" />
    <div class="flex-grow" />
    <CButton
      :importance="1"
      inner-class="!py-2"
      bg-class="bg-themed ring-themed shadow-themed border-themed"
      class="text-white"
      @click="openPanels.todo = !openPanels.todo"
    >
      <ChecklistIcon class="inline-block" />
    </CButton>
    <CButton
      :importance="1"
      inner-class="!py-2"
      bg-class="bg-themed ring-themed shadow-themed border-themed"
      class="text-white"
      @click="openPanels.settings = !openPanels.settings"
    >
      <SettingsIcon class="inline-block" />
    </CButton>
  </div>
</template>
