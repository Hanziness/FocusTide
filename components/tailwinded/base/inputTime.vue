<template>
  <input-text /></input-text>
</template>

<script>
export default {
  components: {
    InputText: () => import('@/components/tailwinded/base/inputText.vue')
  },

  props: {
    value: {
      type: Number,
      default: 0
    },

    mask: {
      type: String,
      default: '##-##'
    }
  },

  data () {
    return {
      timeMs: 0,
      invalid: true
    }
  },

  validations () {
    return {
      timeMs: {

      }
    }
  },

  computed: {
    timeString: {
      get () {
        if (this.invalid) {
          return this.msToTimeStr(this.value)
        }
        return this.msToTimeStr(this.timeMs)
      }
    }
  },

  methods: {
    timeStrToMs (valueString) {
      //  || !timeRule(valueString)
      if (typeof valueString !== 'string') { return null }

      const splitStr = valueString.split(':')
      return Number(splitStr[0]) * 60000 + Number(splitStr[1]) * 1000
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
    },

    timeRule (valueString) {
      const splitStr = valueString.split(':')
      const firstCheck = splitStr.length === 2 && splitStr.every(v => !isNaN(v) && Number.isInteger(Number(v)))

      if (!firstCheck) { return false }

      const secondPartAsNumber = Number(splitStr[1])
      return secondPartAsNumber >= 0 && secondPartAsNumber <= 59
    }
  }
}
</script>
