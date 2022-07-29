<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useSettings } from '@/stores/settings'

enum Control {
  Check = 'check',
  Text = 'text',
  Time = 'time',
  Number = 'number',
  Option = 'option'
}

const controls = {
  check: defineAsyncComponent(() => import('@/components/base/toggle.vue')),
  text: defineAsyncComponent(() => import('@/components/base/inputText.vue')),
  time: defineAsyncComponent(() => import('@/components/base/inputTime.vue')),
  number: defineAsyncComponent(() => import('@/components/base/inputNumber.vue'))
}

interface Props {
  path: Array<string>,
  type: Control,
  disabled?: boolean,
  choices?: Array<string>,
  min?: number,
  max?: number
}

const props = defineProps<Props>()
const translationKey = 'settings.values.' + props.path.join('.')

const settingsStore = useSettings()

const value = computed({
  get () {
    return props.path.reduce((prev, property) => {
      if (prev != null) {
        const next = (prev as any)[property] || null
        return next
      }
      return null
    }, settingsStore.$state)
  },

  set (newValue) {
    const patchObj = {}
    let current = patchObj
    const lastPathItem = props.path[props.path.length - 1]

    for (let i = 0; i < props.path.length - 1; i++) {
      current = current[props.path[i]] = current[props.path[i]] || {}
    }

    current[lastPathItem] = newValue
    settingsStore.$patch(patchObj)
  }
})
</script>

<template>
  <div class="flex flex-row items-center justify-between gap-2">
    <!-- Settings item title and description -->
    <div class="select-none">
      <div v-text="$t(translationKey + '._title')" />
      <div class="text-sm opacity-80" v-text="$t(translationKey + '._description')" />
    </div>

    <!-- Settings item control (right side) -->
    <div class="flex-shrink-0 w-32">
      <Component
        :is="controls[props.type]"
        :disabled="props.disabled"
        :min="props.min"
        :max="props.max"
        :choices="props.choices"
        class="ml-auto"
        :value="value"
        @input="(newValue) => value = newValue"
      />
    </div>

    <!-- TODO Settings item control (below) -->
  </div>
</template>
