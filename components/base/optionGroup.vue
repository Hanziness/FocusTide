<template>
  <div class="flex flex-col md:flex-row select-option-group">
    <option-control
      v-for="(item, key) in values"
      :key="key"
      class="flex-grow"
      :active="key === selected"
      :translation-key="translationKey"
      :translation-subkey="key"
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

<style lang="postcss">
.select-option:not(:last-child) {
  @apply mr-2;
}
</style>
