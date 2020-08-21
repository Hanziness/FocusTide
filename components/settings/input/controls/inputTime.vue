<template>
  <v-text-field
    v-model="processedValue"
    dense
    outlined
    :v-mask="'#?#?#:##'"
    :rules="rules"
    :disabled="disabled"
    hide-details
  />
</template>

<script>
export function timeRule (valueString) {
  const splitStr = valueString.split(':')
  const firstCheck = splitStr.length === 2 && splitStr.every(v => !isNaN(v))

  if (!firstCheck) { return false }

  const secondPartAsNumber = Number(splitStr[1])
  return secondPartAsNumber >= 0 && secondPartAsNumber <= 59
}

export function timeStrToMs (valueString) {
  if (!timeRule(valueString)) { return null }

  const splitStr = valueString.split(':')
  return Number(splitStr[0]) * 60000 + Number(splitStr[1]) * 1000
}

export function msToTimeStr (value) {
  let seconds = Math.round(value / 1000) % 60
  const minutes = '' + ((Math.round(value / 1000) - seconds) / 60)

  if (seconds < 10) {
    seconds = '0' + seconds
  } else {
    seconds = '' + seconds
  }

  return minutes + ':' + seconds
}

export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    outputFormat: {
      type: String,
      default: 'ms',
      required: false
      // validator: (v) => { ['ms', 's'].includes(v) }
    },
    rules: {
      type: Array,
      default: () => [timeRule]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    processedValue: {
      get () {
        return msToTimeStr(this.value)
      },
      set (newValue) {
        for (const rule of this.rules) {
          if (!rule(newValue)) { return }
        }

        this.$emit('input', timeStrToMs(newValue))
      }
    }
  }
}
</script>
