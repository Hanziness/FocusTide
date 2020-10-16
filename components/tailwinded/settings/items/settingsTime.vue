<template>
  <settings-resolver :settings-key="settingsKey">
    <base-settings-item slot-scope="{ value, update, error, translationKey }" :settings-value="value" :translation-key="translationKey">
      <template #content-action="{ settingsValue }">
        <input
          class="form-input w-full text-right bg-gray-200 focus:bg-white"
          :v-mask="'#?#?#:##'"
          type="text"
          :value="msToTimeStr(settingsValue)"
          @input="checkUpdate($event.target.value, update, error)"
        >
      </template>
    </base-settings-item>
  </settings-resolver>
</template>

<script>
export function timeRule (valueString) {
  const splitStr = valueString.split(':')
  const firstCheck = splitStr.length === 2 && splitStr.every(v => !isNaN(v) && Number.isInteger(Number(v)))

  if (!firstCheck) { return false }

  const secondPartAsNumber = Number(splitStr[1])
  return secondPartAsNumber >= 0 && secondPartAsNumber <= 59
}

export function timeStrToMs (valueString) {
  if (typeof valueString !== 'string' || !timeRule(valueString)) { return null }

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
  components: {
    SettingsResolver: () => import('@/components/tailwinded/settings/renderlessSettingsResolver.vue'),
    BaseSettingsItem: () => import('@/components/tailwinded/settings/baseSettingsItemBare.vue')
  },

  props: {
    settingsKey: {
      type: Array,
      default: () => []
    },

    rules: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    processedValue: {
      get () {
        return msToTimeStr(this.value)
      },
      set (newValue) {
        this.$emit('input', timeStrToMs(newValue))
      }
    }
  },

  methods: {
    checkUpdate (newValue, updateFn, errorFn) {
      if (!timeRule(newValue)) {
        errorFn(false)
        return
      }

      const valueInMs = timeStrToMs(newValue)
      let pass = true

      for (const rule in this.rules) {
        const rulePass = rule(valueInMs)
        if (rulePass !== true) {
          pass = rulePass
        }
      }

      if (pass === true) {
        updateFn(valueInMs)
      } else {
        errorFn(pass)
      }
    },

    msToTimeStr (value) {
      return msToTimeStr(value)
    }
  }
}
</script>
