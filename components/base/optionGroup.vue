<script setup lang="ts">
import OptionControl from '~~/components/base/uiOption.vue'

interface Props {
  choices: Record<string, unknown>,
  translationKey?: string,
  value?: keyof Props['choices'],
  overrideText?: Record<'title'|'description', Record<string, string>>
}

const props = withDefaults(defineProps<Props>(), {
  choices: () => ({} as Record<string, string>),
  translationKey: '',
  overrideText: () => ({
    title: {} as Record<string, string>,
    description: {} as Record<string, string>
  })
})

const emit = defineEmits<{(type: 'input', value: keyof Props['choices']): void }>()

const select = (key: string) => {
  emit('input', key)
}
</script>

<template>
  <div class="grid grid-flow-row gap-3 select-option-group" :class="[Object.keys(props.choices).length > 3 ? 'md:grid-flow-row md:grid-cols-3' : 'md:grid-flow-col md:auto-cols-auto']">
    <slot>
      <OptionControl
        v-for="(item, key) in props.choices"
        :key="key"
        class="min-w-0"
        :active="key === props.value"
        :title="!!props.overrideText.title[key] ? props.overrideText.title[key] : $t(`${props.translationKey}._values.${key}`)"
        :description="!!props.overrideText.description[key] ? props.overrideText.description[key] : (props.translationKey ? $t(`${props.translationKey}._valueDescription.${key}`) : '')"
        @click="select(key)"
      />
    </slot>
  </div>
</template>
