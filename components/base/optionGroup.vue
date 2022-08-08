<template>
  <div class="grid grid-flow-row gap-3 select-option-group" :class="[Object.keys(choices).length > 3 ? 'md:grid-flow-row md:grid-cols-3' : 'md:grid-flow-col md:auto-cols-auto']">
    <slot>
      <OptionControl
        v-for="(item, key) in choices"
        :key="key"
        class="min-w-0"
        :active="key === value"
        :title="!!overrideText.title[key] ? overrideText.title[key] : $t(`${translationKey}._values.${key}`)"
        :description="overrideText.description ? (!!overrideText.description[key] ? overrideText.description[key] : $t(`${translationKey}._valueDescription.${key}`)) : ''"
        @click="select(key)"
      />
    </slot>
  </div>
</template>

<script>
import OptionControl from '@/components/base/option.vue'

export default {
  components: {
    OptionControl
  },

  props: {
    choices: {
      type: Object,
      required: true,
      default: () => ({})
    },

    translationKey: {
      type: String,
      default: ''
    },

    value: {
      type: String,
      default: ''
    },

    overrideText: {
      type: Object,
      default: () => ({
        title: {},
        description: {}
      })
    }
  },

  // data () {
  //   return {
  //     value: null
  //   }
  // },

  methods: {
    select (key) {
      // this.value = key
      this.$emit('input', key)
    }
  }
}
</script>
