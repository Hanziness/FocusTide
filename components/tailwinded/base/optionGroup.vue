<template>
  <div class="flex flex-row md:flex-column select-option-group">
    <option-control
      v-for="(item, key) in values"
      :key="key"
      class="flex-grow-1"
      :active="key === selected"
      :translation-key="translationKey"
      :translation-subkey="key"
      @click="select(key)"
    />
  </div>
</template>

<style lang="postcss">
.select-option:not(:last-child) {
  @apply mr-2;
}
</style>

<script>
export default {
  components: {
    OptionControl: () => import('@/components/tailwinded/base/option.vue')
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
