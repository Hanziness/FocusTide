<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useSettings } from '~~/stores/settings'
import OptionGroup from '~~/components/base/optionGroup.vue'

enum Control {
  Check = 'check',
  Text = 'text',
  Time = 'time',
  Number = 'number',
  Option = 'option',
  Empty = 'empty'
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
  choices?: Record<string, unknown>,
  min?: number,
  max?: number
}

const props = defineProps<Props>()
const translationKey = 'settings.values.' + props.path.join('.')

const settingsStore = useSettings()

const emit = defineEmits<{(event: 'input', value: any): void }>()

const value = computed({
  get () {
    if (props.type === Control.Empty) {
      return null
    }

    return props.path.reduce((prev, property) => {
      if (prev != null) {
        const next = (prev as any)[property] || null
        return next
      }
      return null
    }, settingsStore.$state)
  },

  set (newValue) {
    if (props.type === Control.Empty) {
      return
    }

    const patchObj = {}
    let current = patchObj
    const lastPathItem = props.path[props.path.length - 1]

    for (let i = 0; i < props.path.length - 1; i++) {
      current = current[props.path[i]] = current[props.path[i]] || {}
    }

    current[lastPathItem] = newValue
    settingsStore.$patch(patchObj)
    emit('input', newValue)
  }
})

const isSideControls = computed(() => ![Control.Option, Control.Empty].includes(props.type))
</script>

<template>
  <div class="flex flex-col justify-start gap-2" :class="{'pointer-events-none opacity-60': props.disabled }" :tabindex="disabled ? -1 : 0">
    <div class="flex flex-row items-center gap-4">
      <!-- Settings item title and description -->
      <div class="flex-grow select-none">
        <div v-text="$t(translationKey + '._title')" />
        <div class="text-sm opacity-80" v-text="$t(translationKey + '._description')" />
      </div>
      <!-- Settings item control (right side) -->
      <div v-if="isSideControls" class="flex-shrink-0 w-36">
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
    </div>

    <!-- Settings item control (below) -->
    <div v-if="!isSideControls">
      <OptionGroup
        v-if="props.type === Control.Option"
        :choices="props.choices"
        :disabled="props.disabled"
        :value="value"
        :translation-key="translationKey"
        @input="(newValue) => value = newValue"
      />
      <slot />
    </div>
  </div>
</template>
