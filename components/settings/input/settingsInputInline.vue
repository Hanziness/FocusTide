<template>
  <v-form v-model="isInputValid">
    <v-switch
      v-if="type === 'boolean'"
      v-model="settingValue"
      :disabled="disabled"
      inset
      readonly
      @click.stop="settingValue = !settingValue"
    />
    <!-- Select -->
    <v-select
      v-else-if="type === 'select'"
      v-model="settingValue"
      :disabled="disabled"
      class="settings-input"
      outlined
      dense
      hide-details
      :items="items"
    />
    <!-- Number -->
    <v-text-field
      v-else-if="type === 'number'"
      v-model="settingValue"
      :disabled="disabled"
      :rules="rules"
      outlined
      dense
      class="settings-input"
      hide-details
    />
    <!-- Time -->
    <input-time v-else-if="type === 'time'" v-model="settingValue" :disabled="disabled" :rules="rules" />
  </v-form>
</template>

<style lang="scss" scoped>
.settings-input {
  font-size: 14px;
}
</style>

<script>
export default {

  props: {
    type: {
      type: String,
      default: 'boolean',
      validator: (v) => { return ['boolean', 'number', 'time', 'select'].includes(v) }
    },
    value: {
      type: [Boolean, Number, String],
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => [],
      validator: (value) => {
        if (value.length < 1) { return true }

        return value.every((obj) => {
          const check1 = ['text', 'value'].every((key) => { Object.keys(obj).includes(key) })
          const check2 = typeof obj.value === 'object' ? Object.keys(obj).includes('key') : true

          return check1 && check2
        })
      }
    }
  },
  data () {
    return {
      isInputValid: true
    }
  },

  computed: {
    settingValue: {
      get () {
        return this.value
      },
      set (newValue) {
        // time is trusted to only return valid input, the rest should be checked manually
        if (this.type === 'time' || this.rules.every((rule) => { return rule(newValue) })) {
          this.$emit('input', newValue)
        }
      }
    }
  }
}
</script>
