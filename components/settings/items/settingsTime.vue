<template>
  <BaseSettingsItem :settings-key="settingsKey" :disabled="disabled">
    <template #content-action="{ settingsValue, update, error }">
      <InputText
        :value="msToTimeStr(settingsValue)"
        :custom-validators="{ 'time_format': timeRule, 'min_time': minTimeRule }"
        @input="update(timeStrToMs($event))"
        @error="error($event.type, $event.additionalInfo)"
      />
    </template>
  </BaseSettingsItem>
</template>

<script>
export default {
  components: {
    BaseSettingsItem: () => import(/* webpackMode: "eager" */ '~/components/settings/resolvedSettingsItem.vue'),
    InputText: () => import(/* webpackChunkName: "uibase" */ '@/components/base/inputText.vue')
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    rules: {
      type: Array,
      default: () => []
    },

    minMs: {
      type: Number,
      default: 0
    },

    maxMs: {
      type: Number,
      default: undefined
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    processedValue: {
      get () {
        return this.msToTimeStr(this.value)
      },
      set (newValue) {
        this.$emit('input', this.timeStrToMs(newValue))
      }
    }
  },

  methods: {
    timeRule (valueString) {
      const splitStr = valueString.split(':')
      const firstCheck = splitStr.length === 2 && splitStr.every(v => !isNaN(v) && Number.isInteger(Number(v)))

      if (!firstCheck) { return false }

      const secondPartAsNumber = Number(splitStr[1])
      return secondPartAsNumber >= 0 && secondPartAsNumber <= 59
    },

    minTimeRule (valueString) {
      if (!this.timeRule(valueString)) {
        return false
      }

      const timeInMs = this.timeStrToMs(valueString)
      return timeInMs >= this.minMs
    },

    timeStrToMs (valueString) {
      if (typeof valueString !== 'string' || !this.timeRule(valueString)) { return null }

      const splitStr = valueString.split(':')
      return Number(splitStr[0]) * 60000 + Number(splitStr[1]) * 1000
    },

    checkUpdate (newValue, updateFn, errorFn) {
      if (!this.timeRule(newValue)) {
        errorFn('error.format_invalid')
        return
      }

      const errorAdditionalInfo = {
        min: this.$dayjs.formatMs(this.minMs, { format: 'mm:ss' }),
        max: this.$dayjs.formatMs(this.maxMs, { format: 'mm:ss' })
      }

      const valueInMs = this.timeStrToMs(newValue)
      let pass = true

      // check if value is above minimum
      if (this.minMs && valueInMs < this.minMs) {
        errorFn(Error.ERR_MIN, errorAdditionalInfo)
        return
      }

      // check if value is below maximum
      if (this.maxMs && valueInMs > this.maxMs) {
        errorFn(Error.ERR_MAX, errorAdditionalInfo)
        return
      }

      for (const rule in this.rules) {
        const rulePass = rule(valueInMs)
        if (rulePass !== true) {
          pass = rulePass
          break
        }
      }

      if (pass === true) {
        updateFn(valueInMs)
      } else {
        errorFn(pass, errorAdditionalInfo, true)
      }
    },

    msToTimeStr (value) {
      let seconds = Math.round(value / 1000) % 60
      const minutes = '' + ((Math.round(value / 1000) - seconds) / 60)

      if (seconds < 10) {
        seconds = '0' + seconds
      } else {
        seconds = '' + seconds
      }

      return minutes + ':' + seconds
    }
  }
}
</script>
