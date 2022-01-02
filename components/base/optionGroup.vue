<template>
  <div class="grid grid-flow-row md:grid-flow-col md:auto-cols-fr select-option-group gap-3">
    <OptionControl
      v-for="(item, key) in values"
      :key="key"
      class="flex-grow"
      :active="key === selected"
      :translation-key="translationKey"
      :translation-subkey="key"
      :custom-title="overrideText.title[key] ? overrideText.title[key] : null"
      :custom-description="overrideText.description[key] ? overrideText.description[key] : null"
      @click="select(key)"
    />
  </div>
</template>

<script>
export default {
  components: {
    OptionControl: () => import(/* webpackMode: "eager" */ '@/components/base/option.vue')
  },

  props: {
    values: {
      type: Object,
      required: true,
      default: () => {}
    },

    translationKey: {
      type: String,
      default: ''
    },

    selected: {
      type: String,
      default: ''
    },

    overrideText: {
      type: Object,
      default: () => {
        return {
          title: {},
          description: {}
        }
      }
    }
  },

  // data () {
  //   return {
  //     selected: null
  //   }
  // },

  methods: {
    select (key) {
      // this.selected = key
      this.$emit('input', key)
    }
  }
}
</script>
