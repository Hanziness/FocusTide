<template>
  <v-slider
    v-model="processedValue"
    dense
    :disabled="disabled"
    thumb-label
    :min="min"
    :max="max"
    :step="step"
    hide-details
  >
    <template v-slot:thumb-label="{ thumbValue }">
      {{ customLabel ? customLabel : thumbValue }}
    </template>
  </v-slider>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    customLabel: {
      type: String,
      default: undefined
    }
  },

  computed: {
    processedValue: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>
